# Honest hole gold — reasons catalogued in cwl-fullstack-holes.mjs (diagnose info, not warn)
module holes;

@route GET "/legacy"
handler legacy {
  effects: none;
  hole unsupported:php-session;
}

@route POST "/todo"
handler todo {
  effects: none;
  hole cwl:empty-handler;
}
