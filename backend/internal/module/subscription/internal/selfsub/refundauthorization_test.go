package selfsub

import (
	"context"
	"testing"
	"time"

	"github.com/pkg/errors"

	"github.com/perfect-panel/server/internal/model/dto"
	orderEntity "github.com/perfect-panel/server/internal/module/billing/entity/order"
	usermodel "github.com/perfect-panel/server/internal/module/identity/entity/user"
	"github.com/perfect-panel/server/internal/module/subscription/entity/subscribe"
	"github.com/perfect-panel/server/internal/module/subscription/entity/usersub"
	"github.com/perfect-panel/server/internal/repository"
	"github.com/perfect-panel/server/pkg/constant"
	"github.com/perfect-panel/server/pkg/logger/logtest"
	"github.com/perfect-panel/server/pkg/xerr"
)

// fakeOrdersRepo implements just the order lookup used by
// CalculateRemainingAmount; every other OrderRepo method is a fail-fast panic
// via the nil embedded interface.
type fakeOrdersRepo struct {
	repository.OrderRepo
	details *orderEntity.Details
	err     error
}

func (r *fakeOrdersRepo) FindOneDetails(_ context.Context, _ int64) (*orderEntity.Details, error) {
	return r.details, r.err
}

// fakeUserRepo embeds repository.UserRepo (nil) so any unexpected
// method call panics immediately (fail-fast).
type fakeUserRepo struct {
	repository.UserRepo
	repository.UserSubscriptionRepo

	findOneSubscribeFn    func(context.Context, int64) (*usersub.Subscribe, error)
	findOneSubscribeCalls int

	findOneUserSubscribeFn    func(context.Context, int64) (*usersub.SubscribeDetails, error)
	findOneUserSubscribeCalls int
}

func (r *fakeUserRepo) FindOneSubscribe(ctx context.Context, id int64) (*usersub.Subscribe, error) {
	r.findOneSubscribeCalls++
	if r.findOneSubscribeFn != nil {
		return r.findOneSubscribeFn(ctx, id)
	}
	panic("fakeUserRepo: unexpected call to FindOneSubscribe")
}

func (r *fakeUserRepo) FindOneUserSubscribe(ctx context.Context, id int64) (*usersub.SubscribeDetails, error) {
	r.findOneUserSubscribeCalls++
	if r.findOneUserSubscribeFn != nil {
		return r.findOneUserSubscribeFn(ctx, id)
	}
	panic("fakeUserRepo: unexpected call to FindOneUserSubscribe")
}

// fakeStore embeds repository.Store (nil) so any unexpected method
// call panics immediately.
type fakeStore struct {
	repository.Store
	uRepo *fakeUserRepo
	inbox *fakeInboxRepo
}

func (s *fakeStore) Inbox() repository.InboxRepo {
	if s.inbox == nil {
		s.inbox = newFakeInboxRepo()
	}
	return s.inbox
}

func (s *fakeStore) InSubscriptionTx(_ context.Context, fn func(repository.SubscriptionStore) error) error {
	return fn(s)
}

func (s *fakeStore) InBillingTx(_ context.Context, fn func(repository.BillingStore) error) error {
	return fn(s)
}

// The auth-gate tests never reach the refund; a nil embed panics if they do.
func (s *fakeStore) Wallet() repository.WalletRepo { return fakeWalletRepo{} }

type fakeWalletRepo struct{ repository.WalletRepo }

func (s *fakeStore) User() repository.UserRepo { return s.uRepo }
func (s *fakeStore) UserSubscription() repository.UserSubscriptionRepo {
	return s.uRepo
}

func newFakeDeps(uRepo *fakeUserRepo) Deps {
	store := &fakeStore{uRepo: uRepo}
	return Deps{
		UserSubs: uRepo,
		Users:    uRepo,
		Inbox:    store.Inbox(),
		Store:    store,
	}
}

// errCode extracts the xerr.CodeError from the wrapped error chain.
func errCode(t *testing.T, err error) uint32 {
	t.Helper()
	if err == nil {
		t.Fatal("expected error, got nil")
	}
	var ce *xerr.CodeError
	if !errors.As(errors.Cause(err), &ce) {
		t.Fatalf("expected *xerr.CodeError in chain, got %T", err)
	}
	return ce.GetErrCode()
}

// ---------------------------------------------------------------------------
// PreUnsubscribe – authorization-gate tests
// ---------------------------------------------------------------------------

func TestPreUnsubscribe_WrongOwner_ReturnsInvalidAccess(t *testing.T) {
	logtest.Discard(t)

	ctx := context.WithValue(context.Background(), constant.CtxKeyUser, &usermodel.User{Id: 100})
	const subID int64 = 200

	u := &fakeUserRepo{
		findOneSubscribeFn: func(_ context.Context, id int64) (*usersub.Subscribe, error) {
			if id != subID {
				t.Fatalf("FindOneSubscribe: got id %d, want %d", id, subID)
			}
			return &usersub.Subscribe{Id: subID, UserId: 200}, nil
		},
	}

	logic := newPreUnsubscribeLogic(ctx, newFakeDeps(u))
	resp, err := logic.PreUnsubscribe(&dto.PreUnsubscribeRequest{Id: subID})

	if code := errCode(t, err); code != xerr.InvalidAccess {
		t.Fatalf("code = %d, want %d (InvalidAccess)", code, xerr.InvalidAccess)
	}
	if resp != nil {
		t.Fatalf("resp = %+v, want nil", resp)
	}
	if u.findOneSubscribeCalls != 1 {
		t.Fatalf("FindOneSubscribe called %d time(s), want 1", u.findOneSubscribeCalls)
	}
	if u.findOneUserSubscribeCalls != 0 {
		t.Fatalf("FindOneUserSubscribe called %d time(s), want 0", u.findOneUserSubscribeCalls)
	}
}

func TestPreUnsubscribe_OwnerBypassesAuthGate(t *testing.T) {
	logtest.Discard(t)

	ctx := context.WithValue(context.Background(), constant.CtxKeyUser, &usermodel.User{Id: 100})
	const subID int64 = 100

	u := &fakeUserRepo{
		findOneSubscribeFn: func(_ context.Context, id int64) (*usersub.Subscribe, error) {
			if id != subID {
				t.Fatalf("FindOneSubscribe: got id %d, want %d", id, subID)
			}
			return &usersub.Subscribe{Id: subID, UserId: 100}, nil
		},
		findOneUserSubscribeFn: func(_ context.Context, id int64) (*usersub.SubscribeDetails, error) {
			return nil, errors.New("simulated FindOneUserSubscribe failure")
		},
	}

	logic := newPreUnsubscribeLogic(ctx, newFakeDeps(u))
	resp, err := logic.PreUnsubscribe(&dto.PreUnsubscribeRequest{Id: subID})

	if code := errCode(t, err); code == xerr.InvalidAccess {
		t.Fatal("got InvalidAccess – auth gate should not have blocked the owner")
	}
	if resp != nil {
		t.Fatalf("resp = %+v, want nil (expected downstream error)", resp)
	}
	if u.findOneSubscribeCalls != 1 {
		t.Fatalf("FindOneSubscribe called %d time(s), want 1", u.findOneSubscribeCalls)
	}
	if u.findOneUserSubscribeCalls != 1 {
		t.Fatalf("FindOneUserSubscribe called %d time(s), want 1", u.findOneUserSubscribeCalls)
	}
}

func TestPreUnsubscribe_NonCancelableStatus_ReturnsBusinessCode(t *testing.T) {
	logtest.Discard(t)

	ctx := context.WithValue(context.Background(), constant.CtxKeyUser, &usermodel.User{Id: 100})
	const subID int64 = 100

	allowDeduction := true
	u := &fakeUserRepo{
		findOneSubscribeFn: func(_ context.Context, id int64) (*usersub.Subscribe, error) {
			return &usersub.Subscribe{Id: subID, UserId: 100, Status: usersub.SubscribeStatusExpired}, nil
		},
		findOneUserSubscribeFn: func(_ context.Context, id int64) (*usersub.SubscribeDetails, error) {
			return &usersub.SubscribeDetails{
				OrderId:     1,
				SubscribeId: 2,
				Status:      usersub.SubscribeStatusExpired,
				Subscribe:   &subscribe.Subscribe{AllowDeduction: &allowDeduction},
			}, nil
		},
	}

	logic := newPreUnsubscribeLogic(ctx, newFakeDeps(u))
	resp, err := logic.PreUnsubscribe(&dto.PreUnsubscribeRequest{Id: subID})

	// An expired subscription cannot be settled here, but it is a business
	// rejection (60002) rather than an opaque server error (500).
	if code := errCode(t, err); code != xerr.SubscribeNotAvailable {
		t.Fatalf("code = %d, want %d (SubscribeNotAvailable)", code, xerr.SubscribeNotAvailable)
	}
	if resp != nil {
		t.Fatalf("resp = %+v, want nil", resp)
	}
}

func TestCalculateRemainingAmount_UnlimitedTraffic_NoError(t *testing.T) {
	logtest.Discard(t)

	ctx := context.WithValue(context.Background(), constant.CtxKeyUser, &usermodel.User{Id: 100})
	const subID int64 = 100
	now := time.Now()

	allowDeduction := true
	u := &fakeUserRepo{
		findOneSubscribeFn: func(_ context.Context, id int64) (*usersub.Subscribe, error) {
			return &usersub.Subscribe{Id: subID, UserId: 100, Status: usersub.SubscribeStatusActive}, nil
		},
		findOneUserSubscribeFn: func(_ context.Context, id int64) (*usersub.SubscribeDetails, error) {
			return &usersub.SubscribeDetails{
				OrderId:     1,
				SubscribeId: 2,
				Status:      usersub.SubscribeStatusActive,
				StartTime:   now.Add(-24 * time.Hour),
				ExpireTime:  now.Add(24 * time.Hour),
				// Traffic == 0 means unlimited traffic; usage must not trip
				// the used-vs-quota validation.
				Traffic:   0,
				Download:  2048,
				Upload:    4096,
				Subscribe: &subscribe.Subscribe{AllowDeduction: &allowDeduction, UnitTime: "Month"},
			}, nil
		},
	}

	deps := newFakeDeps(u)
	deps.Orders = &fakeOrdersRepo{details: &orderEntity.Details{Quantity: 1, Amount: 1000}}

	remaining, err := CalculateRemainingAmount(ctx, deps, subID)
	if err != nil {
		t.Fatalf("CalculateRemainingAmount() error = %v, want nil", err)
	}
	if remaining < 0 {
		t.Fatalf("CalculateRemainingAmount() = %d, want >= 0", remaining)
	}
}

// ---------------------------------------------------------------------------
// Unsubscribe – authorization-gate tests
// ---------------------------------------------------------------------------

func TestUnsubscribe_WrongOwner_ReturnsInvalidAccess(t *testing.T) {
	logtest.Discard(t)

	ctx := context.WithValue(context.Background(), constant.CtxKeyUser, &usermodel.User{Id: 100})
	const subID int64 = 200

	u := &fakeUserRepo{
		findOneSubscribeFn: func(_ context.Context, id int64) (*usersub.Subscribe, error) {
			if id != subID {
				t.Fatalf("FindOneSubscribe: got id %d, want %d", id, subID)
			}
			return &usersub.Subscribe{Id: subID, UserId: 200, Status: 1}, nil
		},
	}

	logic := newUnsubscribeLogic(ctx, newFakeDeps(u))
	err := logic.Unsubscribe(&dto.UnsubscribeRequest{Id: subID})

	if code := errCode(t, err); code != xerr.InvalidAccess {
		t.Fatalf("code = %d, want %d (InvalidAccess)", code, xerr.InvalidAccess)
	}
	if u.findOneSubscribeCalls != 1 {
		t.Fatalf("FindOneSubscribe called %d time(s), want 1", u.findOneSubscribeCalls)
	}
	if u.findOneUserSubscribeCalls != 0 {
		t.Fatalf("FindOneUserSubscribe called %d time(s), want 0", u.findOneUserSubscribeCalls)
	}
}

func TestUnsubscribe_OwnerBypassesAuthGate(t *testing.T) {
	logtest.Discard(t)

	ctx := context.WithValue(context.Background(), constant.CtxKeyUser, &usermodel.User{Id: 100})
	const subID int64 = 100

	u := &fakeUserRepo{
		findOneSubscribeFn: func(_ context.Context, id int64) (*usersub.Subscribe, error) {
			if id != subID {
				t.Fatalf("FindOneSubscribe: got id %d, want %d", id, subID)
			}
			return &usersub.Subscribe{Id: subID, UserId: 100, Status: 1}, nil
		},
		findOneUserSubscribeFn: func(_ context.Context, id int64) (*usersub.SubscribeDetails, error) {
			return nil, errors.New("simulated FindOneUserSubscribe failure")
		},
	}

	logic := newUnsubscribeLogic(ctx, newFakeDeps(u))
	err := logic.Unsubscribe(&dto.UnsubscribeRequest{Id: subID})

	if code := errCode(t, err); code == xerr.InvalidAccess {
		t.Fatal("got InvalidAccess – auth gate should not have blocked the owner")
	}
	if u.findOneSubscribeCalls != 1 {
		t.Fatalf("FindOneSubscribe called %d time(s), want 1", u.findOneSubscribeCalls)
	}
	if u.findOneUserSubscribeCalls != 1 {
		t.Fatalf("FindOneUserSubscribe called %d time(s), want 1", u.findOneUserSubscribeCalls)
	}
}
