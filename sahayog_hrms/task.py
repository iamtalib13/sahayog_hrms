import frappe

@frappe.whitelist()
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
            gender
        FROM
            `tabHealth Insurance`
        WHERE
            employee_id = '{employee_id}'
        ORDER BY
            dob DESC
    """

    data = frappe.db.sql(sql_query, as_dict=True)
    print (data)
    return data



def ping():
    print("pong")
    