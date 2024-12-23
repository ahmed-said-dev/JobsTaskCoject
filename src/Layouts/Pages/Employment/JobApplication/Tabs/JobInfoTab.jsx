import React, { useEffect, useState } from 'react';
import { Grid, Box, Typography } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import { Request, Input, Select, Upload, Form } from 'coject';

const useStyles = makeStyles()((theme) => ({
  inputLabel: {
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(1),
    fontWeight: 500,
    fontSize: '0.875rem'
  }
}));

export default function JobInfoTab({ onUpdate, initialData = {} }) {
  const { classes } = useStyles();
  const [qualificationData, setQualificationData] = useState([]);
  const [specializationData, setSpecializationData] = useState([]);
  const [estimateData, setEstimateData] = useState([]);

  useEffect(() => {
    Request({
      dataSource: {
        method: 'post',
        dataPath: 'DATA.REF_ID',
        apiUrl: '/PrcAcademicQualificationAnyDdl',
        baseUrl: "https://aseer.aait.com.sa:4801/API/C279486795214703A93A3DC417DB35E1/Hrms/Custom",
      },
      data: { TOKEN: '902DBEAE47DE4EB2A471AA338165B66D' },
      callback: (data) => {
        setQualificationData(data);
      },
    }).then();

    Request({
      dataSource: {
        method: 'post',
        dataPath: 'DATA.REF_ID',
        apiUrl: '/PrcSpecializationAnyDdl',
        baseUrl: "https://aseer.aait.com.sa:4801/API/C279486795214703A93A3DC417DB35E1/Hrms/Custom",
      },
      data: { TOKEN: '902DBEAE47DE4EB2A471AA338165B66D' },
      callback: (data) => {
        setSpecializationData(data);
      },
    }).then();

    Request({
      dataSource: {
        method: 'post',
        dataPath: 'DATA.REF_ID',
        apiUrl: '/PrcEstimateAnyDdl',
        baseUrl: "https://aseer.aait.com.sa:4801/API/C279486795214703A93A3DC417DB35E1/Hrms/Custom",
      },
      data: { TOKEN: '902DBEAE47DE4EB2A471AA338165B66D' },
      callback: (data) => {
        setEstimateData(data);
      },
    }).then();
  }, []);

  const handleChange = (values) => {
    onUpdate?.(values);
  };

  return (
    <Form values={initialData} onChange={handleChange}>
      <Box sx={{ p: 2, bgcolor: '#F5F7FF', borderRadius: 2 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Typography className={classes.inputLabel}>
              المؤهل العلمي
            </Typography>
            <Select
              name="qualification"
              label=" "
              validation={{ required: true }}
              variant="outlined"
              fullWidth
              staticData={qualificationData}
              getOptionLabel={(option) => option?.label || ''}
              getOptionValue={(option) => option?.value || ''}
              customKey='ACADEMIC_QUALIFICATION_ID'
              customName='ACADEMIC_QUALIFICATION_NAME'
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography className={classes.inputLabel}>
              الجامعة
            </Typography>
            <Input
              name="university"
              label=""
              placeholder="ادخل اسم الجامعة"
              validation={{ arabic: 'يجب إدخال حروف عربية فقط' }}
              variant="outlined"
              fullWidth
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography className={classes.inputLabel}>
              سنة التخرج
            </Typography>
            <Input
              name="graduationYear"
              label=""
              type="number"
              placeholder="ادخل سنة التخرج"
              validation={{ number: 'يجب إدخال أرقام فقط' }}
              variant="outlined"
              fullWidth
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography className={classes.inputLabel}>
              البلد
            </Typography>
            <Input
              name="location"
              label=""
              placeholder="ادخل اسم البلد"
              validation={{ arabic: 'يجب إدخال حروف عربية فقط' }}
              variant="outlined"
              fullWidth
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography className={classes.inputLabel}>
              التخصص
            </Typography>
            <Select
              name="major"
              label=" "
              validation={{ required: true }}
              variant="outlined"
              fullWidth
              staticData={specializationData}
              getOptionLabel={(option) => option?.label || ''}
              getOptionValue={(option) => option?.value || ''}
              customKey='SPECIALIZATION_ID'
              customName='SPECIALIZATION_NAME'
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography className={classes.inputLabel}>
              التقدير
            </Typography>
            <Select
              name="estimate"
              label=" "
              validation={{ required: true }}
              variant="outlined"
              fullWidth
              staticData={estimateData}
              getOptionLabel={(option) => option?.label || ''}
              getOptionValue={(option) => option?.value || ''}
              customKey='ESTIMATE_ID'
              customName='ESTIMATE_NAME'
            />
          </Grid>

          <Grid item xs={12}>
            <Typography className={classes.inputLabel}>
              المرفقات
            </Typography>
            <Upload
              name="attachments"
              imagePath="file"
              validation={{ required: true }}
              multiple
            />
          </Grid>
        </Grid>
      </Box>
    </Form>
  );
}
