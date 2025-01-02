import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Grid, Modal, Table, TableHead, TableRow, TableCell, Paper, TableContainer, IconButton, InputAdornment } from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Tab from '@mui/material/Tab';
import { makeStyles } from 'tss-react/mui';
import { useLocation, useNavigate } from 'react-router-dom';
import { Request, Input, Select, Upload, Form, DatePicker, Icons } from 'coject';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import LocationOn from '@mui/icons-material/LocationOn';
import axios from 'axios';
import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next';

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
  },
  inputLabel: {
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(1),
    fontWeight: 500,
    fontSize: '0.875rem'
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px'
  },
  modalActions: {
    display: 'flex',
    justifyContent: 'flex-start',
    gap: '10px',
    marginTop: '24px',
    direction: 'ltr'
  }
}));

export default function JobApplicationPage() {
  const { classes } = useStyles();
  const [value, setValue] = useState('0');
  const location = useLocation();
  const navigate = useNavigate();
  const jobTitle = location.state?.jobTitle || 'مهندس';
  const jobData = location.state || {};

  const [formData, setFormData] = useState({
    fullName: '',
    birthDate: null,
    idNumber: '',
    mobile: '',
    email: '',
    gender: null,
    healthStatus: null,
    qualification: null,
    university: '',
    specialization: null,
    estimate: null,
    graduationYear: '',
    country: '',
    tableData: [],
    selectedSkills: [],
    availableJobId: location.state?.AVAILABLE_JOB_ID || 1
  });

  const [genderData, setGenderData] = useState([]);
  const [healthStatusData, setHealthStatusData] = useState([]);
  const [qualificationData, setQualificationData] = useState([]);
  const [specializationData, setSpecializationData] = useState([]);
  const [estimateData, setEstimateData] = useState([]);
  const [experienceData, setExperienceData] = useState([]);
  const [skills, setSkills] = useState([]);

  const [experienceModalOpen, setExperienceModalOpen] = useState(false);

  const { t } = useTranslation(['HRMS']);

  useEffect(() => {
    const fetchData = async () => {
      const endpoints = [
        { url: '/PrcGenderAnyDdl', setter: setGenderData },
        { url: '/PrcHealthStatusAnyDdl', setter: setHealthStatusData },
        { url: '/PrcAcademicQualificationAnyDdl', setter: setQualificationData },
        { url: '/PrcSpecializationAnyDdl', setter: setSpecializationData },
        { url: '/PrcEstimateAnyDdl', setter: setEstimateData },
        { url: '/PrcExperienceAnyDdl', setter: setExperienceData },
        { url: '/PrcSkillAnyDdl', setter: setSkills }
      ];
            
      endpoints.forEach(endpoint => {
        Request({
          dataSource: {
            method: 'post',
            dataPath: 'DATA.REF_ID',
            apiUrl: endpoint.url,
            baseUrl: "https://aseer.aait.com.sa:4801/API/C279486795214703A93A3DC417DB35E1/Hrms/Custom",
          },
          data: { TOKEN: '902DBEAE47DE4EB2A471AA338165B66D' },
          callback: (data) => {
            endpoint.setter(data);
          },
        }).then();
      });
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (location.state?.AVAILABLE_JOB_ID) {
      setFormData(prev => ({
        ...prev,
        availableJobId: location.state.AVAILABLE_JOB_ID
      }));
    }
  }, [location.state]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSubmit = async () => {
    try {
      if (!formData.availableJobId) {
        alert('خطأ في بيانات الوظيفة. الرجاء المحاولة مرة أخرى');
        return;
      }

      if (!formData.birthDate) {
        alert('الرجاء إدخال تاريخ الميلاد');
        return;
      }

      const formatDate = (date) => {
        try {
          if (!date) {
            return new Date().toISOString().split('T')[0];
          }
          const d = new Date(date);
          if (isNaN(d.getTime())) {
            return new Date().toISOString().split('T')[0];
          }
          return d.toISOString().split('T')[0];
        } catch (error) {
          console.error('Error formatting date:', error);
          return new Date().toISOString().split('T')[0];
        }
      };

      const formattedBirthDate = formatDate(formData.birthDate);

      const apiData = {
        ESTIMATE_ID: formData.estimate || null,
        SPECIALIZATION_ID: formData.specialization || null,
        AVAILABLE_JOB_ID: Number(formData.availableJobId),
        APPLICANT_NAME: formData.fullName || '',
        NATIONALID: Number(formData.idNumber) || null,
        MOBILE: formData.mobile || '',
        BIRTHDATE: formattedBirthDate,
        EMAIL: formData.email || '',
        GENDER_ID: formData.gender || null,
        HEALTH_STATUS_ID: formData.healthStatus || null,
        ACADEMIC_QUALIFICATION_ID: formData.qualification || null,
        QUALIFICATION_COUNTRY: formData.country || 'SA',
        UNIVERSITY: formData.university || '',
        GRADUATION_YEAR: Number(formData.graduationYear) || null,
        SKILL_ID: formData.selectedSkills ? formData.selectedSkills.join(',') : '',
        PTOKEN: '902DBEAE47DE4EB2A471AA338165B66D'
      };

      const response = await axios.post('https://aseer.aait.com.sa:4801/API/C279486795214703A93A3DC417DB35E1/Hrms/Custom/PrcJobApplyDataIns', { TOKEN: '902DBEAE47DE4EB2A471AA338165B66D', ...apiData });
      const PJOB_APPLY_ID = response.data.DATA.PJOB_APPLY_ID;

      toast.success('تم إرسال طلب التوظيف بنجاح');

      for (const experience of formData.tableData) {
        try {
          const startDate = experience.startDate ? moment(experience.startDate, "DD/MM/YYYY").format("YYYY-MM-DD") : null;
          const endDate = experience.endDate ? moment(experience.endDate, "DD/MM/YYYY").format("YYYY-MM-DD") : null;

          const experiencePayload = {
            JOB_APPLY_ID: PJOB_APPLY_ID,
            EXPERIENCE_ID: experience.experience,
            WORKPLACE: experience.location,
            JOB_TITLE: experience.job,
            START_DATE: startDate,
            END_DATE: endDate
          };

          await axios.post('https://aseer.aait.com.sa:4801/API/C279486795214703A93A3DC417DB35E1/Hrms/Custom/PrcJobApplyExperienceInsert', experiencePayload);
          toast.success('تم إضافة الخبرة بنجاح');
        } catch (error) {
          toast.error(`خطأ في إضافة الخبرة: ${error.response?.data?.MESSAGE?.MESSAGE || 'حدث خطأ ما'}`);
        }
      }
    } catch (error) {
      toast.error(`خطأ في إرسال الطلب: ${error.response?.data?.MESSAGE?.MESSAGE || 'حدث خطأ ما'}`);
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const handleExperienceModalOpen = () => setExperienceModalOpen(true);
  const handleExperienceModalClose = () => setExperienceModalOpen(false);

  const handleExperienceSave = (values) => {
    const newTableData = [...formData.tableData, {
      ...values,
      id: Date.now()
    }];

    setFormData(prev => ({
      ...prev,
      tableData: newTableData
    }));
    handleExperienceModalClose();
  };

  const handleExperienceDelete = (id) => {
    const newTableData = formData.tableData.filter(item => item.id !== id);
    setFormData(prev => ({
      ...prev,
      tableData: newTableData
    }));
  };

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: '8px',
    outline: 'none'
  };

  return (
    <Box className={classes.root}>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Box className={classes.header}>
        <Typography variant="h6" component="h1">
          التقديم علي الوظائف المتاحة ({jobTitle})
        </Typography>
      </Box>

      <Form>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList
              onChange={handleChange}
              className={classes.tabs}
              TabIndicatorProps={{
                style: {
                  backgroundColor: '#1976d2',
                }
              }}
            >
              <Tab label={t('HRMS:personalInfo')} value="0" className={classes.tab} />
              <Tab label={t('HRMS:lastQualification')} value="1" className={classes.tab} />
              <Tab label={t('HRMS:experienceInfo')} value="2" className={classes.tab} />
              <Tab label={t('HRMS:skills')} value="3" className={classes.tab} />
            </TabList>
          </Box>

          <TabPanel value="0" className={classes.tabPanel}>
            <Box sx={{ p: 2, bgcolor: '#F5F7FF', borderRadius: 2 }}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography className={classes.inputLabel}>
                    {t('HRMS:fullName')}
                  </Typography>
                  <Input
                    name="fullName"
                    label=""
                    placeholder={t('HRMS:enterFullName')}
                    validation={{ arabic: 'يجب إدخال حروف عربية فقط' }}
                    variant="outlined"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <Typography className={classes.inputLabel}>
                    {t('HRMS:birthDate')}
                  </Typography>
                  <DatePicker
                    name="birthDate"
                    label={t('HRMS:selectBirthDate')}
                    placeholder={t('HRMS:dateFormat')}
                    validation={{ required: true }}
                    variant="outlined"
                    onChange={(date) => setFormData({ ...formData, birthDate: date })}
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <Typography className={classes.inputLabel}>
                    {t('HRMS:idNumber')}
                  </Typography>
                  <Input
                    name="idNumber"
                    label=""
                    placeholder={t('HRMS:enterIdNumber')}
                    validation={{ number: 'يجب إدخال أرقام فقط' }}
                    variant="outlined"
                    value={formData.idNumber}
                    onChange={(e) => setFormData({ ...formData, idNumber: e.target.value })}
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <Typography className={classes.inputLabel}>
                    {t('HRMS:mobile')}
                  </Typography>
                  <Input
                    name="mobile"
                    label=""
                    placeholder={t('HRMS:enterMobile')}
                    validation={{ number: 'يجب إدخال أرقام فقط' }}
                    variant="outlined"
                    value={formData.mobile}
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <Typography className={classes.inputLabel}>
                    {t('HRMS:email')}
                  </Typography>
                  <Input
                    name="email"
                    label=""
                    placeholder={t('HRMS:enterEmail')}
                    validation={{ 
                      email: 'يرجى إدخال بريد إلكتروني صحيح',
                      pattern: {
                        value: /^[a-zA-Z0-9@.]+$/,
                        message: 'يجب إدخال حروف إنجليزية فقط'
                      }
                    }}
                    variant="outlined"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <Typography className={classes.inputLabel}>
                    {t('HRMS:gender')}
                  </Typography>
                  <Select
                    name="gender"
                    label=" "
                    validation={{}}
                    variant="outlined"
                    fullWidth
                    staticData={genderData}
                    customKey='GENDER_ID'
                    customName='GENDER_NAME'
                    value={formData.gender}
                    onChange={(e, value) => {
                      setFormData({ ...formData, gender: value.GENDER_ID })
                    }}
                    isOptionEqualToValue={(option, value) => 
                      option?.GENDER_ID === value?.GENDER_ID
                    }
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <Typography className={classes.inputLabel}>
                    {t('HRMS:healthStatus')}
                  </Typography>
                  <Select
                    name="healthStatus"
                    label=" "
                    validation={{}}
                    variant="outlined"
                    fullWidth
                    staticData={healthStatusData}
                    customKey='HEALTH_STATUS_ID'
                    customName='HEALTH_STATUS_NAME'
                    value={formData.healthStatus}
                    onChange={(e, value) => {
                      setFormData({ ...formData, healthStatus: value.HEALTH_STATUS_ID })
                    }}
                    isOptionEqualToValue={(option, value) => 
                      option?.HEALTH_STATUS_ID === value?.HEALTH_STATUS_ID
                    }
                  />
                </Grid>
              </Grid>
            </Box>
          </TabPanel>

          <TabPanel value="1" className={classes.tabPanel}>
            <Box sx={{ p: 2, bgcolor: '#F5F7FF', borderRadius: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <Typography className={classes.inputLabel}>
                    {t('HRMS:qualification')}
                  </Typography>
                  <Select
                    name="qualification"
                    label=" "
                    validation={{ required: '' }}
                    variant="outlined"
                    fullWidth
                    staticData={qualificationData}
                    customKey='ACADEMIC_QUALIFICATION_ID'
                    customName='ACADEMIC_QUALIFICATION_NAME'
                    value={formData.qualification}
                    onChange={(e, value) => {
                      setFormData({ ...formData, qualification: value.ACADEMIC_QUALIFICATION_ID });
                    }}
                    isOptionEqualToValue={(option, value) => 
                      option?.ACADEMIC_QUALIFICATION_ID === value?.ACADEMIC_QUALIFICATION_ID
                    }
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <Typography className={classes.inputLabel}>
                    {t('HRMS:university')}
                  </Typography>
                  <Input
                    name="university"
                    label=""
                    placeholder={t('HRMS:enterUniversity')}
                    validation={{ required: '' }}
                    variant="outlined"
                    value={formData.university}
                    onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <Typography className={classes.inputLabel}>
                    {t('HRMS:specialization')}
                  </Typography>
                  <Select
                    name="specialization"
                    label=" "
                    validation={{ required: '' }}
                    variant="outlined"
                    fullWidth
                    staticData={specializationData}
                    customKey='SPECIALIZATION_ID'
                    customName='SPECIALIZATION_NAME'
                    value={formData.specialization}
                    onChange={(e, value) => {
                      setFormData({ ...formData, specialization: value.SPECIALIZATION_ID });
                    }}
                    isOptionEqualToValue={(option, value) => 
                      option?.SPECIALIZATION_ID === value?.SPECIALIZATION_ID
                    }
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <Typography className={classes.inputLabel}>
                    {t('HRMS:estimate')}
                  </Typography>
                  <Select
                    name="estimate"
                    label=" "
                    validation={{ required: '' }}
                    variant="outlined"
                    fullWidth
                    staticData={estimateData}
                    customKey='ESTIMATE_ID'
                    customName='ESTIMATE_NAME'
                    value={formData.estimate}
                    onChange={(e, value) => {
                      setFormData({ ...formData, estimate: value.ESTIMATE_ID });
                    }}
                    isOptionEqualToValue={(option, value) => 
                      option?.ESTIMATE_ID === value?.ESTIMATE_ID
                    }
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <Typography className={classes.inputLabel}>
                    {t('HRMS:graduationYear')}
                  </Typography>
                  <Input
                    name="graduationYear"
                    label=""
                    placeholder={t('HRMS:enterGraduationYear')}
                    validation={{ required: '' }}
                    variant="outlined"
                    value={formData.graduationYear}
                    onChange={(e) => setFormData({ ...formData, graduationYear: e.target.value })}
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <Typography className={classes.inputLabel}>
                    {t('HRMS:country')}
                  </Typography>
                  <Input
                    name="country"
                    label=""
                    placeholder={t('HRMS:enterCountry')}
                    validation={{ required: '' }}
                    variant="outlined"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LocationOn />
                        </InputAdornment>
                      )
                    }}
                    fullWidth
                  />
                </Grid>
              </Grid>
            </Box>
          </TabPanel>

          <TabPanel value="2" className={classes.tabPanel}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<AddIcon />}
                  onClick={handleExperienceModalOpen}
                >
                  {t('HRMS:addNewRecord')}
                </Button>
              </div>

              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell align="right">{t('HRMS:experience')}</TableCell>
                      <TableCell align="right">{t('HRMS:job')}</TableCell>
                      <TableCell align="right">{t('HRMS:location')}</TableCell>
                      <TableCell align="right">{t('HRMS:startDate')}</TableCell>
                      <TableCell align="right">{t('HRMS:endDate')}</TableCell>
                      <TableCell align="right">{t('HRMS:delete')}</TableCell>
                    </TableRow>
                  </TableHead>
                  <tbody>
                    {formData.tableData.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell align="right">{experienceData.find(exp => exp.EXPERIENCE_ID === row.experience)?.EXPERIENCE_NAME || 'غير معروف'}</TableCell>
                        <TableCell align="right">{row.job}</TableCell>
                        <TableCell align="right">{row.location}</TableCell>
                        <TableCell align="right">{row.startDate}</TableCell>
                        <TableCell align="right">{row.endDate}</TableCell>
                        <TableCell>
                          <IconButton onClick={() => handleExperienceDelete(row.id)} color="error">
                            <CloseIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </tbody>
                </Table>
              </TableContainer>

              <Modal open={experienceModalOpen} onClose={handleExperienceModalClose}>
                <Box sx={modalStyle}>
                  <div className={classes.modalHeader}>
                    <Typography variant="h6">{t('HRMS:addNewRecord')}</Typography>
                    <IconButton onClick={handleExperienceModalClose}>
                      <CloseIcon />
                    </IconButton>
                  </div>

                  <Form onSubmit={handleExperienceSave}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={6}>
                        <Typography className={classes.inputLabel}>
                          {t('HRMS:experience')}
                        </Typography>
                        <Select
                          name="experience"
                          label=" "
                          validation={{ required: '' }}
                          variant="outlined"
                          fullWidth
                          staticData={experienceData}
                          customKey='EXPERIENCE_ID'
                          customName='EXPERIENCE_NAME'
                          value={formData.experience}
                          onChange={(e, value) => {
                            setFormData({ ...formData, experience: value.EXPERIENCE_ID });
                          }}
                          isOptionEqualToValue={(option, value) => 
                            option?.EXPERIENCE_ID === value?.EXPERIENCE_ID
                          }
                        />
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <Typography className={classes.inputLabel}>
                          {t('HRMS:job')}
                        </Typography>
                        <Input
                          name="job"
                          label=""
                          placeholder={t('HRMS:enterJob')}
                          validation={{ required: '' }}
                          variant="outlined"
                          fullWidth
                          value={formData.job}
                          onChange={(e) => setFormData({ ...formData, job: e.target.value })}
                        />
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <Typography className={classes.inputLabel}>
                          {t('HRMS:location')}
                        </Typography>
                        <Input
                          name="location"
                          label=""
                          placeholder={t('HRMS:enterLocation')}
                          validation={{ required: '' }}
                          variant="outlined"
                          fullWidth
                          value={formData.location}
                          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        />
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <Typography className={classes.inputLabel}>
                          {t('HRMS:startDate')}
                        </Typography>
                        <DatePicker
                          name="startDate"
                          label={t('HRMS:selectStartDate')}
                          placeholder={t('HRMS:dateFormat')}
                          viewFormat={"DD / MM / YYYY"}
                          actionFormat={"DD/MM/YYYY"}
                          validation={{ required: '' }}
                          variant="outlined"
                          fullWidth
                          value={formData.startDate}
                          onChange={(date) => setFormData({ ...formData, startDate: date })}
                        />
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <Typography className={classes.inputLabel}>
                          {t('HRMS:endDate')}
                        </Typography>
                        <DatePicker
                          name="endDate"
                          label={t('HRMS:selectEndDate')}
                          placeholder={t('HRMS:dateFormat')}
                          viewFormat={"DD / MM / YYYY"}
                          actionFormat={"DD/MM/YYYY"}
                          validation={{ required: '' }}
                          variant="outlined"
                          fullWidth
                          value={formData.endDate}
                          onChange={(date) => setFormData({ ...formData, endDate: date })}
                        />
                      </Grid>
                    </Grid>

                    <div className={classes.modalActions}>
                      <Button
                        variant="contained"
                        type="submit"
                        sx={{
                          backgroundColor: '#556ee6',
                          '&:hover': {
                            backgroundColor: '#4458b8'
                          }
                        }}
                      >
                        {t('HRMS:save')}
                      </Button>
                      <Button
                        variant="outlined"
                        onClick={handleExperienceModalClose}
                        sx={{
                          borderColor: '#556ee6',
                          color: '#556ee6',
                          '&:hover': {
                            borderColor: '#4458b8',
                            backgroundColor: 'transparent'
                          }
                        }}
                      >
                        {t('HRMS:cancel')}
                      </Button>
                    </div>
                  </Form>
                </Box>
              </Modal>
            </div>
          </TabPanel>

          <TabPanel value="3" className={classes.tabPanel}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Select
                  name="selectedSkills"
                  label={t('HRMS:skills')}
                  multiple
                  validation={{ required: '' }}
                  variant="outlined"
                  fullWidth
                  staticData={skills}
                  customKey='SKILL_ID'
                  customName='SKILL_NAME'
                  value={formData.selectedSkills}
                  onChange={(e, value) => {
                    const selectedIds = value.map(item => item.SKILL_ID);
                    setFormData({ ...formData, selectedSkills: selectedIds });
                  }}
                  isOptionEqualToValue={(option, value) => 
                    option?.SKILL_ID === value?.SKILL_ID
                  }
                />
              </Grid>
            </Grid>
          </TabPanel>
        </TabContext>

        <Box className={classes.buttonsContainer}>
          <Button
            variant="contained"
            onClick={handleSubmit}
            className={classes.submitButton}
          >
            {t('HRMS:sendRequest')}
          </Button>
          <Button
            variant="outlined"
            onClick={handleCancel}
            className={classes.cancelButton}
          >
            {t('HRMS:cancel')}
          </Button>
        </Box>
      </Form>
    </Box>
  );
}
