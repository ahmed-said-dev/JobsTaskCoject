import React, { useEffect, useState } from 'react';
import {  Grid, Page, Request } from 'coject';
import { Box, Paper } from '@mui/material';
import { useStyles } from 'tss-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const PrcAvailableJobDataSelAny = () => {
  const [jobs, setJobs] = useState([]);
  const { classes } = useStyles();
  const { t } = useTranslation(['HRMS']);
  const navigate = useNavigate();

  // const gridDataSource = 

  useEffect(() => {
    Request({
      dataSource: {
        method: 'post',
        dataPath: 'DATA.REF_ID',
        apiUrl: '/PrcAvailableJobDataSelAny',
        baseUrl: "https://aseer.aait.com.sa:4801/API/C279486795214703A93A3DC417DB35E1/Hrms/Custom",
  
      },
      data: {  TOKEN: '902DBEAE47DE4EB2A471AA338165B66D' },
      callback: (data) => {
        setJobs(data);
      },
    }).then();
    
  }, []);

  const gridColumns = [
    { field: 'WORKPLACE', headerName: "Workplace", flex: 1 },
    { field: 'AGE', headerName: "Age", flex: 1 },
    { field: 'SALARY', headerName: "Salary", flex: 1 },
    { field: 'IS_ACTIVE_Y_N', headerName: "Vacancy", flex: 1 },
    { field: 'SKILL_NAME', headerName: "Skill Name", flex: 1 },
    { field: 'EXPERIENCE_NAME', headerName: "Experience Name", flex: 1 },
    { field: 'ACADEMIC_QUALIFICATION_NAME', headerName: "Academic Qualification Name", flex: 1 },
  ];

  const handleApplyJob = (rowData) => {
    console.log(rowData);
    
    // Only pass the necessary data
    const jobData = {
      jobTitle: rowData.JOB_DESCRIPTION,
      workplace: rowData.WORKPLACE,
      skillName: rowData.SKILL_NAME,
      experienceName: rowData.EXPERIENCE_NAME,
      academicQualification: rowData.ACADEMIC_QUALIFICATION_NAME
    };

    // Navigate to the job application page with minimal job data
    navigate('/employment/job-application', { 
      state: jobData
    });
  };

  console.log(jobs);
  
 
  return (
    <Page title={"Available Job Data"}>
      <Box className={classes.root}>
        <Paper elevation={1} sx={{ p: 2 }}>
          <Grid
            staticData={jobs}
            schema={gridColumns}
            customKey="ACADEMIC_QUALIFICATION_NAME"
            customActions={[
            {
              icon: "RemoveRedEye", 
              label: "عرض الوظيفة", 
              onClick: (row) => handleApplyJob(row)
            },
            {
              icon: "AppRegistration", 
              label: "Apply", 
              onClick: (_,row) => handleApplyJob(row)
            },
          ]}
          />
        </Paper>
      </Box>
    </Page>
  );
};

export default PrcAvailableJobDataSelAny;
