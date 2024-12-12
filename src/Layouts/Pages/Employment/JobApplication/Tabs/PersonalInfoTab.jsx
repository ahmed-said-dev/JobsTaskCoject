import React, { useEffect, useState } from 'react';
import { Grid, TextField, Box, Typography, Select, MenuItem, FormControl } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import { Request } from 'coject';

const useStyles = makeStyles()((theme) => ({
  inputLabel: {
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(1),
    fontWeight: 500,
    fontSize: '0.875rem'
  },
  textField: {
    '& .MuiOutlinedInput-root': {
      backgroundColor: '#fff',
      borderRadius: '8px',
      '& fieldset': {
        borderColor: '#E0E0E0',
      },
      '&:hover fieldset': {
        borderColor: theme.palette.primary.main,
      },
    },
  },
  select: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    borderColor: '#E0E0E0',

    '& .MuiOutlinedInput-root': {
      backgroundColor: '#E0E0E0',
    }
  },
  inputIcon: {
    color: theme.palette.text.secondary,
    marginRight: theme.spacing(1),
  }
}));

export default function PersonalInfoTab({ onUpdate, initialData = {} }) {
  const { classes } = useStyles();
  const [genderData, setGenderData] = useState([]);
  const [healthStatusData, setHealthStatusData] = useState([]);
  const [formData, setFormData] = useState({
    fullName: initialData.fullName || '',
    birthDate: initialData.birthDate || '',
    idNumber: initialData.idNumber || '',
    mobile: initialData.mobile || '',
    email: initialData.email || '',
    gender: initialData.gender || '',
    healthStatus: initialData.healthStatus || ''
  });

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
        console.log('Gender Data:', data);
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
        console.log('Health Status Data:', data);
        setHealthStatusData(data);
      },
    }).then();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prev => {
      const newData = { ...prev, [name]: value };
      onUpdate?.(newData);
      return newData;
    });
  };

  return (
    <Box sx={{ p: 2, bgcolor: '#F5F7FF', borderRadius: 2 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography className={classes.inputLabel}>
            الاسم رباعي
          </Typography>
          <TextField
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="ادخل اسمك الرباعي"
            required
            fullWidth
            className={classes.textField}
            variant="outlined"
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <Typography className={classes.inputLabel}>
            تاريخ الميلاد
          </Typography>
          <TextField
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
            type="date"
            required
            fullWidth
            className={classes.textField}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <Typography className={classes.inputLabel}>
            رقم الاثبات
          </Typography>
          <TextField
            name="idNumber"
            value={formData.idNumber}
            onChange={handleChange}
            placeholder="ادخل رقم الاثبات"
            required
            fullWidth
            className={classes.textField}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <Typography className={classes.inputLabel}>
            رقم الجوال
          </Typography>
          <TextField
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            placeholder="ادخل رقم الجوال"
            required
            fullWidth
            className={classes.textField}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <Typography className={classes.inputLabel}>
            البريد الالكتروني
          </Typography>
          <TextField
            name="email"
            value={formData.email}
            onChange={handleChange}
            type="email"
            placeholder="ادخل البريد الالكتروني"
            required
            fullWidth
            className={classes.textField}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <Typography className={classes.inputLabel}>
            الجنس
          </Typography>
          <FormControl fullWidth>
            <Select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className={`${classes.textField} ${classes.select}`}
              displayEmpty
            >
              <MenuItem value="" disabled>اختر الجنس</MenuItem>
              {genderData.map((gender) => (
                <MenuItem key={gender.GENDER_ID} value={gender.GENDER_NAME}>{gender.GENDER_NAME}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={4}>
          <Typography className={classes.inputLabel}>
            الحالة الصحية
          </Typography>
          <FormControl fullWidth>
            <Select
              name="healthStatus"
              value={formData.healthStatus}
              onChange={handleChange}
              className={`${classes.textField} ${classes.select}`}
              displayEmpty
            >
              <MenuItem value="" disabled>اختر الحالة الصحية</MenuItem>
              {healthStatusData.map((status) => (
                <MenuItem key={status.HEALTH_STATUS_ID} value={status.HEALTH_STATUS_NAME}>{status.HEALTH_STATUS_NAME}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
}
