# Multi-file fragment — health
module health_frag;

@route GET "/health"
handler health {
  effects: none;
  return true;
}
