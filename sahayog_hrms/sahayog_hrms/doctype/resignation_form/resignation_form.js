// Copyright (c) 2024, Talib sheikh and contributors
// For license information, please see license.txt

frappe.ui.form.on("Resignation Form", {
  refresh: function (frm) {
    frm.trigger("section_colors");
    if (frm.is_new()) {
      frm.trigger("employee_details");
    } else {
      if (frm.doc.status == "Draft") {
        frm.trigger("submit_button");
      }
      if (frm.doc.status == "Submitted") {
        frm.trigger("cancel_button");
        frm.disable_save();
      }
    }
  },

  cancel_button: function (frm) {
    //submit button code
    frm.add_custom_button(__("Cancel"), function () {
      // Confirmation dialog
      frappe.confirm(
        "<i>Are you sure you want to Cancel?</i>",
        () => {
          // action to perform if Yes is selected

          frm.set_value("status", "Draft");
          frm.save();
          // You can add further actions here if needed
        },
        () => {
          // action to perform if No is selected
          // You can add further actions here if needed
        }
      );
    });

    frm.change_custom_button_type("Cancel", null, "danger");
  },

  submit_button: function (frm) {
    //submit button code
    frm.add_custom_button(__("Submit"), function () {
      // Confirmation dialog
      frappe.confirm(
        "<i>Are you sure you want to submit?</i>",
        () => {
          // action to perform if Yes is selected

          frm.set_value("status", "Submitted");
          frm.save();
          // You can add further actions here if needed
        },
        () => {
          // action to perform if No is selected
          // You can add further actions here if needed
        }
      );
    });

    frm.change_custom_button_type("Submit", null, "success");
  },

  employee_details: function (frm) {
    let user = frappe.session.user;

    frm.call({
      method: "get_emp_details",
      args: {
        emp_id: user, // or the field that contains the employee ID
      },
      callback: function (response) {
        if (response.message) {
          const { emp_id, details } = response.message;
          if (details.length > 0) {
            // Extract the first record from details array
            const employee = details[0];

            // Set values in the form fields
            frm.set_value("employee_id", emp_id);
            frm.set_value("department", employee.department);
            frm.set_value("division", employee.division);

            frm.set_value("branch", employee.branch);
            frm.set_value("employee_name", employee.employee_name);
            frm.set_value("phone", employee.cell_number);
            frm.set_value("designation", employee.designation);
            frm.set_value("zone", employee.zone);
            frm.set_value("region", employee.region);
          }
        }
      },
    });
  },
  section_colors: function (frm) {
    //form border color
    $(".form-control").css("border", "1px solid #d3d3d3");

    //section_colors
    frm.fields_dict["section_0"].wrapper.css("background-color", "#F0F8FF");
    frm.fields_dict["section_1"].wrapper.css("background-color", "#F0F8FF");
    frm.fields_dict["section_2"].wrapper.css("background-color", "#E1EBEE");
    frm.fields_dict["section_3"].wrapper.css("background-color", "#F0F8FF");
    frm.fields_dict["section_4"].wrapper.css("background-color", "#E1EBEE");
    frm.fields_dict["section_5"].wrapper.css("background-color", "#F0F8FF");
    frm.fields_dict["section_6"].wrapper.css("background-color", "#E1EBEE");
    frm.fields_dict["section_7"].wrapper.css("background-color", "#F0F8FF");
    frm.fields_dict["section_8"].wrapper.css("background-color", "#E1EBEE");
    $("span.sidebar-toggle-btn").hide();
    $(".col-lg-2.layout-side-section").hide();
  },
});
