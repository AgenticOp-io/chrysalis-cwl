# UI island contracts — named islands + form events (RFC-0028)
module ui_island_contracts;

@page GET "/signup"
page signup {
  effects: none;
  return ui {
    element "main" {
      element "h1" {
        text "Signup";
      }
      client ui "signup" {
        element "form" {
          element "input" name "email" {
            on change { action "email.changed"; }
          }
          element "button" {
            text "Save";
            on click { action "signup.save"; }
          }
        }
      }
    }
  };
}

@page GET "/anon"
page anon_island {
  effects: none;
  return ui {
    element "section" {
      client ui {
        element "button" {
          text "Ping";
          on click { action "ping"; }
        }
      }
    }
  };
}
