import frappe

def execute(filters=None):
    if not filters:
        filters = {}

    columns = get_columns()
    data = get_health_insurance_data()

    if not data:
        frappe.msgprint("No Records Found")
        return columns, data

    return columns, data

def get_columns():
    return [
        {
            "fieldname": "employee_id",
            "label": "Employee ID",
            "fieldtype": "Data",
            "width": 120,
        },
        {
            "fieldname": "uhid",
            "label": "UHID",
            "fieldtype": "Data",
            "width": 200,
        },
        {
            "fieldname": "insured_name",
            "label": "Insured Name",
            "fieldtype": "Data",
            "width": 250,
        },
        {
            "fieldname": "dob",
            "label": "Date of Birth",
            "fieldtype": "Data",
            "width": 150,
        },
        {
            "fieldname": "age",
            "label": "Age",
            "fieldtype": "Data",
            "width": 50,
        },
        {
            "fieldname": "relationship",
            "label": "Relationship",
            "fieldtype": "Data",
            "width": 100,
        },
        {
            "fieldname": "gender",
            "label": "Gender",
            "fieldtype": "Data",
            "width": 100,
        },
         {
            "fieldname": "doj",
            "label": "Date of Joining",
            "fieldtype": "Data",
            "width": 100,
        },
    ]

def get_health_insurance_data():
    # Extract the employee ID from the session user
    session_user = frappe.session.user
    employee_id = session_user.split('@')[0]  # Trim after '@'

    # SQL query to fetch data from `tabHealth Insurance` without date filter
    sql_query = f"""
        SELECT
            employee_id,
            uhid,
            insured_name,
            dob,
            age,
            relationship,
            gender,
            doj
        FROM
            `tabHealth Insurance`
        WHERE
            employee_id = '{employee_id}'
        ORDER BY
            dob DESC
    """

    data = frappe.db.sql(sql_query, as_dict=True)
    return data
