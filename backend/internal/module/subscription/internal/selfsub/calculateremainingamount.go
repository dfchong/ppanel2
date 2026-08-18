package selfsub

import (
	"context"

	"github.com/perfect-panel/server/internal/module/subscription/entity/usersub"
	"github.com/perfect-panel/server/pkg/logger"
	"github.com/perfect-panel/server/pkg/tool"

	"github.com/perfect-panel/server/pkg/deduction"
	"github.com/perfect-panel/server/pkg/xerr"
	"github.com/pkg/errors"
)

func CalculateRemainingAmount(ctx context.Context, deps Deps, userSubscribeId int64) (int64, error) {
	// Find User Subscribe
	userSubscribe, err := deps.UserSubs.FindOneUserSubscribe(ctx, userSubscribeId)
	if err != nil {
		logger.WithContext(ctx).Error("[func CalculateRemainingAmount(ctx context.Context, deps Deps, userSubscribeId int64) (int64, error) {\n] FindOneUserSubscribe", logger.Field("err", err.Error()), logger.Field("id", userSubscribeId))
		return 0, errors.Wrapf(xerr.NewErrCode(xerr.DatabaseQueryError), "FindOneUserSubscribe failed, id: %d", userSubscribeId)
	}
	if userSubscribe.OrderId == 0 {
		return 0, nil
	}
	if userSubscribe.Subscribe == nil {
		return 0, errors.Wrapf(xerr.NewErrCode(xerr.SubscribeNotAvailable), "subscribe plan not found, id: %d", userSubscribe.SubscribeId)
	}
	// AllowDeduction is a nullable column defaulting to true; treat NULL as
	// allowed so a legacy plan row cannot panic the preview/cancellation.
	allowDeduction := userSubscribe.Subscribe.AllowDeduction == nil || *userSubscribe.Subscribe.AllowDeduction
	if !allowDeduction && !deps.SingleModel() {
		return 0, errors.Wrapf(xerr.NewErrCode(xerr.SubscribeNotAvailable), "The subscription package does not support deductions")
	}

	// Only the statuses Unsubscribe accepts may be settled here, so the
	// preview and the cancellation stay consistent. Anything else is a
	// business rejection, not a server error.
	cancelable := []uint8{usersub.SubscribeStatusPending, usersub.SubscribeStatusActive, usersub.SubscribeStatusFinished}
	if !tool.Contains(cancelable, userSubscribe.Status) {
		return 0, errors.Wrapf(xerr.NewErrCode(xerr.SubscribeNotAvailable), "The subscription package is not in use")
	}
	// Find Order Details
	orderDetails, err := deps.Orders.FindOneDetails(ctx, userSubscribe.OrderId)
	if err != nil {
		logger.WithContext(ctx).Error("[PreUnsubscribe] FindOneDetails", logger.Field("err", err.Error()), logger.Field("id", userSubscribe.OrderId))
		return 0, errors.Wrapf(xerr.NewErrCode(xerr.DatabaseQueryError), "FindOneDetails failed, id: %d", userSubscribe.OrderId)
	}
	// Calculate Order Quantity
	orderQuantity := orderDetails.Quantity
	// Calculate Order Amount
	orderAmount := orderDetails.Amount + orderDetails.GiftAmount

	if len(orderDetails.SubOrders) > 0 {
		for _, subOrder := range orderDetails.SubOrders {
			if subOrder.Status == 2 || subOrder.Status == 5 {
				orderAmount += subOrder.Amount + subOrder.GiftAmount
				orderQuantity += subOrder.Quantity
			}
		}
	}
	// Calculate Remaining Amount
	remainingAmount, err := deduction.CalculateRemainingAmount(
		deduction.Subscribe{
			StartTime:      userSubscribe.StartTime,
			ExpireTime:     userSubscribe.ExpireTime,
			Traffic:        userSubscribe.Traffic,
			Download:       userSubscribe.Download,
			Upload:         userSubscribe.Upload,
			UnitTime:       userSubscribe.Subscribe.UnitTime,
			UnitPrice:      userSubscribe.Subscribe.UnitPrice,
			ResetCycle:     userSubscribe.Subscribe.ResetCycle,
			DeductionRatio: userSubscribe.Subscribe.DeductionRatio,
		},
		deduction.Order{
			Amount:   orderAmount,
			Quantity: orderQuantity,
		},
	)
	if err != nil {
		return 0, errors.Wrapf(xerr.NewErrCode(500), "CalculateRemainingAmount failed, userSubscribeId: %d, err: %v", userSubscribeId, err)
	}
	return remainingAmount, nil
}
