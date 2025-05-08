import { useOutletContext } from "react-router-dom";
import { Employee } from "../../../interfaces/employee";
import EmployeeCard from "../components/EmployeeCard";
import { Fragment, useEffect, useState } from "react";
import { EmployeeService } from "../../../services/employee.service";
import { EmployeeSalaryReport } from "../../../interfaces/employee-salary-report";
import { Col, Row } from "antd";
import dayjs from 'dayjs'

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
      <Row justify="space-evenly" align="stretch" gutter={[16, 16]}>
        <Col span={4}><EmployeeCard label="Monthly Salary" value={<Fragment>&#8369; {employeeSalaryReport?.salary}</Fragment>} /></Col>
        <Col span={4}><EmployeeCard label={`${dayjs().format('MMM YYYY')} Absences`} value={<Fragment>{employeeSalaryReport?.numAbsences} day(s)</Fragment>} /></Col>
        <Col span={4}><EmployeeCard label={`${dayjs().format('MMM YYYY')} Projected Salary`} value={<Fragment>&#8369; {employeeSalaryReport?.expectedSalary}</Fragment>} /></Col>
        <Col span={4}><EmployeeCard label={`${dayjs((new Date()).setDate(0)).format('MMM YYYY')} Absences`} value={<Fragment>{employeeSalaryReport?.absencesLastMonth} day(s)</Fragment>} /></Col>
        <Col span={4}><EmployeeCard label={`${dayjs((new Date()).setDate(0)).format('MMM YYYY')} Salary`} value={<Fragment>&#8369; {employeeSalaryReport?.salaryLastMonth}</Fragment>} /></Col>
      </Row>
    </>
  )
}