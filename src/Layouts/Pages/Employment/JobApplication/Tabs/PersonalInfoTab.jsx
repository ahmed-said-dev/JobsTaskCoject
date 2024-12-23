import React, { useEffect, useState } from 'react';
import { Grid, Box, Typography } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import { Request, Input, Select, Form, DatePicker } from 'coject';

const useStyles = makeStyles()((theme) => ({
  inputLabel: {
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(1),
    fontWeight: 500,
    fontSize: '0.875rem'
  }
}));

export default function PersonalInfoTab({ onUpdate, initialData = {} }) {
  const { classes } = useStyles();
  const [genderData, setGenderData] = useState([]);
  const [healthStatusData, setHealthStatusData] = useState([]);
  console.log(genderData);
  

  useEffect(() => {
    Request({
      dataSource: {
        method: 'post',
        dataPath: 'DATA.REF_ID',
        apiUrl: '/PrcGenderAnyDdl',
        baseUrl: "https://aseer.aait.com.sa:4801/API/C279486795214703A93A3DC417DB35E1/Hrms/Custom",
      },
      data: { TOKEN: '902DBEAE47DE4EB2A471AA338165B66D' },
      callback: (data) => {
        setGenderData(data);
      },
    }).then();

    Request({
      dataSource: {
        method: 'post',
        dataPath: 'DATA.REF_ID',
        apiUrl: '/PrcHealthStatusAnyDdl',
        baseUrl: "https://aseer.aait.com.sa:4801/API/C279486795214703A93A3DC417DB35E1/Hrms/Custom",
      },
      data: { TOKEN: '902DBEAE47DE4EB2A471AA338165B66D' },
      callback: (data) => {
        setHealthStatusData(data);
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
          <Grid item xs={12}>
            <Typography className={classes.inputLabel}>
              الاسم رباعي
            </Typography>
            <Input
              name="fullName"
              label=""
              placeholder="ادخل اسمك الرباعي"
              validation={{ arabic: 'يجب إدخال حروف عربية فقط' }}
              variant="outlined"
              fullWidth
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography className={classes.inputLabel}>
              تاريخ الميلاد
            </Typography>

            <DatePicker
              name="birthDate"
              label=""
              viewFormat={"DD / MM / YYYY"}
              validation={{}}
              variant="outlined"
              fullWidth
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography className={classes.inputLabel}>
              رقم الاثبات
            </Typography>
            <Input
              name="idNumber"
              label=""
              placeholder="ادخل رقم الاثبات"
              validation={{ number: 'يجب إدخال أرقام فقط' }}
              variant="outlined"
              fullWidth
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography className={classes.inputLabel}>
              رقم الجوال
            </Typography>
            <Input
              name="mobile"
              label=""
              placeholder="ادخل رقم الجوال"
              validation={{ number: 'يجب إدخال أرقام فقط' }}
              variant="outlined"
              fullWidth
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography className={classes.inputLabel}>
              البريد الإلكتروني
            </Typography>
            <Input
              name="email"
              label=""
              placeholder="ادخل البريد الإلكتروني"
              validation={{ english: 'يجب إدخال حروف إنجليزية فقط' }}
              variant="outlined"
              fullWidth
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography className={classes.inputLabel}>
              الجنس
            </Typography>
            <Select
              name="gender"
              label=" "
              validation={{}}
              variant="outlined"
              fullWidth
              staticData={genderData}
              // getOptionLabel={(option) => option?.label || ''}
              // getOptionValue={(option) => option?.value || ''}
              customKey='GENDER_ID'
              customName='GENDER_NAME'
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography className={classes.inputLabel}>
              الحالة الصحية
            </Typography>
            <Select
              name="healthStatus"
              label=" "
              validation={{}}
              variant="outlined"
              fullWidth
              staticData={healthStatusData}
              getOptionLabel={(option) => option?.label || ''}
              getOptionValue={(option) => option?.value || ''}
              customKey='HEALTH_STATUS_ID'
              customName='HEALTH_STATUS_NAME'
            />
          </Grid>
        </Grid>
      </Box>
    </Form>
  );
}
