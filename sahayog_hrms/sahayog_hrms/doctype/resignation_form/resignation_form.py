# Copyright (c) 2024, Talib Sheikh and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class ResignationForm(Document):
    pass

@frappe.whitelist()
def get_emp_details(emp_id):
    # Trim the employee ID to get the part before '@'
    trimmed_emp_id = emp_id.split('@')[0]
    
    # Fetch employee details
    details = frappe.db.sql(
        f"""SELECT department, division, user_id, branch, employee_name, cell_number, designation, zone, region
        FROM `tabEmployee` WHERE employee_id = '{trimmed_emp_id}';""",
        as_dict=True,
    )
    
    # Return the details along with the trimmed employee ID
    return {
        'emp_id': trimmed_emp_id,
        'details': details
    }
