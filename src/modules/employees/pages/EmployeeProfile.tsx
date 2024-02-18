import { useOutletContext } from "react-router-dom";
import { Employee } from "../../../interfaces/employee";
import EmployeeCard from "../components/EmployeeCard";
import { Fragment, useEffect, useState } from "react";
import { EmployeeService } from "../../../services/employee.service";
import { EmployeeSalaryReport } from "../../../interfaces/employee-salary-report";
import { Col, Row } from "antd";

export default function EmployeeProfile() {
  const employee = useOutletContext<Employee>();
  const [employeeSalaryReport, setEmployeeSalaryReport] = useState<EmployeeSalaryReport>();

  const getEmployeeSalaryReport = async () => {
    try {
      const res = await EmployeeService.getEmployeeSalaryReport(employee.id)
      setEmployeeSalaryReport(res.data);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getEmployeeSalaryReport()
  }, [])

  return (
    <>
      <Row justify="center" align="middle">
        <Col span={5}><EmployeeCard label="Monthly Salary" value={<Fragment>&#8369; {employeeSalaryReport?.salary}</Fragment>} /></Col>
        <Col span={5}><EmployeeCard label="Feb 2024 Absences" value={<Fragment>{employeeSalaryReport?.numAbsences} day(s)</Fragment>} /></Col>
        <Col span={5}><EmployeeCard label="Feb 2024 Projected Salary" value={<Fragment>&#8369; {employeeSalaryReport?.expectedSalary}</Fragment>} /></Col>
      </Row>
    </>
  )
}