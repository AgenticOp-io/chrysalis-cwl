# Multi-file CWL gold (RFC-0009)
module gold_multi;

import "health.cwl";
import "meta.cwl";

@route GET "/ping"
handler ping {
  effects: none;
  return 42;
}
