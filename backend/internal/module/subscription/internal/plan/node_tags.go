package plan

import "strings"

// splitNodeTags splits a comma-separated node_tags column value into a list.
// An empty column value yields an empty slice — strings.Split("", ",") would
// return [""], which then trips the nodes-clearing fallback on update and
// pollutes the edit form with a bogus empty tag.
func splitNodeTags(s string) []string {
	if s == "" {
		return []string{}
	}
	return strings.Split(s, ",")
}

// cleanNodeTags returns the request tags with empty/whitespace entries
// removed. An empty-string-only payload (e.g. [""] produced from an empty DB
// value) must not trigger the nodes-clearing fallback, otherwise a plain node
// selection would be wiped on every save (#94).
func cleanNodeTags(tags []string) []string {
	if len(tags) == 0 {
		return nil
	}
	cleaned := make([]string, 0, len(tags))
	for _, tag := range tags {
		if t := strings.TrimSpace(tag); t != "" {
			cleaned = append(cleaned, t)
		}
	}
	return cleaned
}
