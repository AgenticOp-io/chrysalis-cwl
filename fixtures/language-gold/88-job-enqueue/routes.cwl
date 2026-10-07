# Background job enqueue intent (RFC-0036)
module job_enqueue;

@route POST "/digest"
handler digest {
  effects: job.enqueue name nightly_digest;
  return { ok: true, surface: "digest" };
}

@route POST "/fanout"
handler fanout {
  effects: job.enqueue, rate.limit;
  return { ok: true, surface: "fanout" };
}
