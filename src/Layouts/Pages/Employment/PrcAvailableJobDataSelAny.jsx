import { useEffect, useState, useContext } from 'react';
import {  Grid, Page, Request } from 'coject';
import { Box, Paper } from '@mui/material';
import { useStyles } from 'tss-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Store } from "../../../Services/Stores";

const PrcAvailableJobDataSelAny = () => {
  const [jobs, setJobs] = useState([]);
  const { classes } = useStyles();
  const { t } = useTranslation(['HRMS']);
  const navigate = useNavigate();
  const { gridLocaleText } = useContext(Store);

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
    { field: 'WORKPLACE', headerName: t('HRMS:workplace'), flex: 1, align: 'right', headerAlign: 'right' },
    { field: 'AGE', headerName: t('HRMS:age'), flex: 1, align: 'right', headerAlign: 'right' },
    { field: 'SALARY', headerName: t('HRMS:salary'), flex: 1, align: 'right', headerAlign: 'right' },
    { field: 'IS_ACTIVE_Y_N', headerName: t('HRMS:vacancy'), flex: 1, align: 'right', headerAlign: 'right' },
    { field: 'SKILL_NAME', headerName: t('HRMS:skillName'), flex: 1, align: 'right', headerAlign: 'right' },
    { field: 'EXPERIENCE_NAME', headerName: t('HRMS:experienceName'), flex: 1, align: 'right', headerAlign: 'right' },
    { field: 'ACADEMIC_QUALIFICATION_NAME', headerName: t('HRMS:academicQualification'), flex: 1, align: 'right', headerAlign: 'right' },
  ];

  const handleApplyJob = (rowData) => {
    const jobData = {
      AVAILABLE_JOB_ID: rowData.AVAILABLE_JOB_ID,
      jobTitle: rowData.JOB_DESCRIPTION,
      workplace: rowData.WORKPLACE,
      skillName: rowData.SKILL_NAME,
      experienceName: rowData.EXPERIENCE_NAME,
      academicQualification: rowData.ACADEMIC_QUALIFICATION_NAME
    };

    navigate('/employment/job-application', { 
      state: jobData
    });
  };

  return (
    <Page title={t('HRMS:availableJobs')}>
      <Box className={classes.root}>
        <Paper elevation={1} sx={{ p: 2 }}>
          <Grid
            staticData={jobs}
            schema={gridColumns}
            customKey="ACADEMIC_QUALIFICATION_NAME"
            localeText={gridLocaleText}
            store={Store}
            customActions={[
            {
              icon: "RemoveRedEye", 
              label: t('HRMS:viewJob'), 
              onClick: (row) => handleApplyJob(row)
            },
            {
              icon: "AppRegistration", 
              label: t('HRMS:applyJob'), 
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
