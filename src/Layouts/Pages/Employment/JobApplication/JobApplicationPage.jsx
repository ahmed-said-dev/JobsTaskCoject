import React from 'react';
import { Box, Tab, Tabs, Typography, Button } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import { useLocation, useNavigate } from 'react-router-dom';
import PersonalInfoTab from './Tabs/PersonalInfoTab';
import JobInfoTab from './Tabs/JobInfoTab';
import ExperienceTab from './Tabs/ExperienceTab';
import SkillsTab from './Tabs/SkillsTab';

const useStyles = makeStyles()((theme) => ({
  root: {
    backgroundColor: '#fff',
    borderRadius: theme.spacing(1),
  },
  header: {
    padding: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
  },
  tabs: {
    minHeight: '48px',
    backgroundColor: '#F5F7FF',
    '& .MuiTabs-flexContainer': {
      gap: '2px',
    },
    '& .MuiTabs-indicator': {
      height: '3px',
      borderRadius: '3px 3px 0 0',
    },
  },
  tab: {
    minHeight: '48px',
    padding: '12px 24px',
    color: '#666',
    backgroundColor: '#F5F7FF',
    fontSize: '14px',
    textTransform: 'none',
    '&.Mui-selected': {
      color: theme.palette.primary.main,
      backgroundColor: '#fff',
      fontWeight: 600,
    },
  },
  tabPanel: {
    padding: theme.spacing(3),
  },
  buttonsContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: theme.spacing(2),
    padding: theme.spacing(2),
    borderTop: '1px solid #eee',
    backgroundColor: '#fff',
    position: 'sticky',
    bottom: 0,
  },
  submitButton: {
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  },
  cancelButton: {
    color: theme.palette.text.secondary,
    backgroundColor: '#F5F7FF',
    '&:hover': {
      backgroundColor: '#E7E9F6',
    },
  }
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      {...other}
    >
      {value === index && children}
    </div>
  );
}

export default function JobApplicationPage() {
  const { classes } = useStyles();
  const [value, setValue] = React.useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const jobTitle = location.state?.jobTitle || 'مهندس';
  const jobData = location.state || {};
  const [formData, setFormData] = React.useState({
    personalInfo: {},
    jobInfo: {},
    experience: {},
    skills: {}
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSubmit = () => {
    console.log('Submitting form data:', formData);
    // Add your API call here
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const updateFormData = (section, data) => {
    setFormData(prev => ({
      ...prev,
      [section]: data
    }));
  };

  return (
    <Box className={classes.root}>
      <Box className={classes.header}>
        <Typography variant="h6" component="h1">
          التقديم علي الوظائف المتاحة ({jobTitle})
        </Typography>
      </Box>

      <Tabs
        value={value}
        onChange={handleChange}
        className={classes.tabs}
        TabIndicatorProps={{
          style: {
            backgroundColor: '#1976d2',
          }
        }}
      >
        <Tab
          label="البيانات الشخصية"
          className={classes.tab}
        />
        <Tab
          label="بيانات اخر مؤهل"
          className={classes.tab}
        />
        <Tab
          label="بيانات الخبرات"
          className={classes.tab}
        />
        <Tab
          label="المهارات"
          className={classes.tab}
        />
      </Tabs>

      <Box className={classes.tabPanel}>
        <TabPanel value={value} index={0}>
          <PersonalInfoTab 
            onUpdate={(data) => updateFormData('personalInfo', data)}
            initialData={formData.personalInfo}
          />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <JobInfoTab 
            jobData={jobData} 
            onUpdate={(data) => updateFormData('jobInfo', data)}
            initialData={formData.jobInfo}
          />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <ExperienceTab 
            jobData={jobData} 
            onUpdate={(data) => updateFormData('experience', data)}
            initialData={formData.experience}
          />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <SkillsTab 
            jobData={jobData} 
            onUpdate={(data) => updateFormData('skills', data)}
            initialData={formData.skills}
          />
        </TabPanel>
      </Box>

      <Box className={classes.buttonsContainer}>
        <Button
          variant="contained"
          className={classes.submitButton}
          onClick={handleSubmit}
        >
          ارسال الطلب
        </Button>
        <Button
          variant="contained"
          className={classes.cancelButton}
          onClick={handleCancel}
        >
          الغاء
        </Button>
      </Box>
    </Box>
  );
}
