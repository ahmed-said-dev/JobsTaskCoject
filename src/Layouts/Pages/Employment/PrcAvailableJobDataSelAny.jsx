import React, { useEffect, useState } from 'react';
import {  Grid, Page } from 'coject';
import { Box, Paper } from '@mui/material';
import { useStyles } from 'tss-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom'; // Add this import

const PrcAvailableJobDataSelAny = () => {
  const [jobs, setJobs] = useState([]);
  const { classes } = useStyles();
  const { t } = useTranslation(['HRMS']);
  const navigate = useNavigate(); // Add this hook

  const gridDataSource = {
    dataPath: "DATA.REF_ID",
    apiUrl: "/PrcAvailableJobDataSelAny",
    baseUrl: "https://aseer.aait.com.sa:4801/API/C279486795214703A93A3DC417DB35E1/Hrms/Custom",
    requestConfig: {
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      transformRequest: [(data) => {
        return data;
      }]
    }
  }

  const gridColumns = [
    { field: 'WORKPLACE', headerName: "Workplace", flex: 1 },
    { field: 'AGE', headerName: "Age", flex: 1 },
    { field: 'SALARY', headerName: "Salary", flex: 1 },
    { field: 'IS_ACTIVE_Y_N', headerName: "Vacancy", flex: 1 },
    { field: 'SKILL_NAME', headerName: "Skill Name", flex: 1 },
    { field: 'EXPERIENCE_NAME', headerName: "Experience Name", flex: 1 },
    { field: 'ACADEMIC_QUALIFICATION_NAME', headerName: "Academic Qualification Name", flex: 1 },
  ];

  const handleApplyJob = (_, data) => {
    console.log(data);
    
    navigate(`/job-application/${data.AVAILABLE_JOB_ID}`, { state: { jobData: data } });
  };
 
  return (
    <Page title={"Available Job Data"}>
      <Box className={classes.root}>
        <Paper elevation={1} sx={{ p: 2 }}>
          <Grid
            dataSource={gridDataSource}
            schema={gridColumns}
            customKey="ACADEMIC_QUALIFICATION_NAME"
            customActions={[
            {
              icon: "RemoveRedEye", 
              label: "عرض الوظيفة", 
              onClick: handleApplyJob
            },
            {
              icon: "AppRegistration", 
              label: "Apply", 
              onClick: handleApplyJob
            },
          ]}
          />
        </Paper>
      </Box>
    </Page>
  );
};

export default PrcAvailableJobDataSelAny;
