package plan

import (
	"reflect"
	"testing"
)

func TestSplitNodeTags(t *testing.T) {
	tests := []struct {
		name string
		in   string
		want []string
	}{
		{"empty", "", []string{}},
		{"single", "香港", []string{"香港"}},
		{"multiple", "香港,台湾", []string{"香港", "台湾"}},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got := splitNodeTags(tt.in)
			if !reflect.DeepEqual(got, tt.want) {
				t.Fatalf("splitNodeTags(%q) = %#v, want %#v", tt.in, got, tt.want)
			}
		})
	}
}

func TestCleanNodeTags(t *testing.T) {
	tests := []struct {
		name string
		in   []string
		want []string
	}{
		{"nil", nil, nil},
		{"empty", []string{}, nil},
		{"only empty string", []string{""}, nil},
		{"empty strings only", []string{"", "  "}, nil},
		{"mixed", []string{"", "香港", " "}, []string{"香港"}},
		{"normal", []string{"香港", "台湾"}, []string{"香港", "台湾"}},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got := cleanNodeTags(tt.in)
			if len(got) != len(tt.want) {
				t.Fatalf("cleanNodeTags(%#v) = %#v, want %#v", tt.in, got, tt.want)
			}
			for i := range got {
				if got[i] != tt.want[i] {
					t.Fatalf("cleanNodeTags(%#v) = %#v, want %#v", tt.in, got, tt.want)
				}
			}
		})
	}
}
