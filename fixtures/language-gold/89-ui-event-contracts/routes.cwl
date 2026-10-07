# Broader client-island event contracts (RFC-0037)
module ui_event_contracts;

@page GET "/editor"
page editor {
  effects: none;
  return ui {
    element "main" {
      client ui "editor" {
        element "input" name "title" {
          on input { action "title.input"; }
          on focus { action "title.focus"; }
          on blur { action "title.blur"; }
        }
        element "textarea" name "body" {
          on keydown { action "body.keydown"; }
          on change { action "body.change"; }
        }
        element "button" {
          text "Save";
          on click { action "editor.save"; }
        }
      }
    }
  };
}
