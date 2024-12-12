import React, { useEffect, useState } from 'react';
import { Grid, TextField, Box, Typography, Select, MenuItem, FormControl, Button } from '@mui/material';
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
  fileInput: {
    display: 'none'
  },
  fileUploadContainer: {
    width: '100%',
    marginTop: '24px'
  },
  fileButton: {
    backgroundColor: '#fff',
    border: '1px solid #E0E0E0',
    borderRadius: '8px',
    padding: '14px',
    width: '100%',
    justifyContent: 'space-between',
    textAlign: 'right',
    color: '#666',
    position: 'relative',
    height: '56px',
    '&:hover': {
      backgroundColor: '#f5f5f5',
      borderColor: theme.palette.primary.main,
    }
  },
  attachIcon: {
    width: '42px',
    height: '42px',
    backgroundColor: theme.palette.primary.main,
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: '10px',
    top: '50%',
    transform: 'translateY(-50%)',
    '& svg': {
      color: '#fff',
      width: '48px',
      height: '48px'
    }
  },
  selectedFile: {
    marginTop: theme.spacing(1),
    fontSize: '0.875rem',
    color: theme.palette.text.secondary
  }
}));

export default function JobInfoTab({ onUpdate, initialData = {} }) {
  const { classes } = useStyles();
  const [qualificationData, setQualificationData] = useState([]);
  const [specializationData, setSpecializationData] = useState([]);
  const [estimateData, setEstimateData] = useState([]);
  const [selectedFile, setSelectedFile] = useState(initialData.selectedFile || null);
  const [formData, setFormData] = useState({
    qualification: initialData.qualification || '',
    university: initialData.university || '',
    graduationYear: initialData.graduationYear || '',
    location: initialData.location || '',
    major: initialData.major || '',
    estimate: initialData.estimate || '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prev => {
      const newData = { ...prev, [name]: value };
      onUpdate?.({ ...newData, selectedFile });
      return newData;
    });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Check file type
      const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
      if (!allowedTypes.includes(file.type)) {
        alert('الرجاء اختيار ملف PDF أو صورة');
        return;
      }
      // Check file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        alert('حجم الملف يجب أن لا يتجاوز 5 ميجابايت');
        return;
      }
      setSelectedFile(file);
      onUpdate?.({ ...formData, selectedFile: file });
    }
  };

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
        console.log('Academic Qualification Data:', data);
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
        console.log('Specialization Data:', data);
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
        console.log('Estimate Data:', data);
        setEstimateData(data);
      },
    }).then();
  }, []);

  return (
    <Box sx={{ p: 2, bgcolor: '#F5F7FF', borderRadius: 2 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Typography className={classes.inputLabel}>
            المؤهل
          </Typography>
          <FormControl fullWidth>
            <Select
              name="qualification"
              value={formData.qualification}
              onChange={handleChange}
              className={`${classes.textField} ${classes.select}`}
              displayEmpty
            >
              <MenuItem value="" disabled>اختر المؤهل</MenuItem>
              {qualificationData.map((qualification) => (
                <MenuItem 
                  key={qualification.ACADEMIC_QUALIFICATION_ID} 
                  value={qualification.ACADEMIC_QUALIFICATION_NAME}
                >
                  {qualification.ACADEMIC_QUALIFICATION_NAME}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={4}>
          <Typography className={classes.inputLabel}>
            الجامعة
          </Typography>
          <TextField
            name="university"
            value={formData.university}
            onChange={handleChange}
            placeholder="ادخل اسم الجامعة"
            required
            fullWidth
            className={classes.textField}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <Typography className={classes.inputLabel}>
            سنة التخرج
          </Typography>
          <TextField
            name="graduationYear"
            value={formData.graduationYear}
            onChange={handleChange}
            placeholder="ادخل سنة التخرج"
            required
            fullWidth
            type="number"
            className={classes.textField}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <Typography className={classes.inputLabel}>
            البلد
          </Typography>
          <TextField
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="ادخل اسم البلد"
            required
            fullWidth
            className={classes.textField}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <Typography className={classes.inputLabel}>
            التخصص
          </Typography>
          <FormControl fullWidth>
            <Select
              name="major"
              value={formData.major}
              onChange={handleChange}
              className={`${classes.textField} ${classes.select}`}
              displayEmpty
            >
              <MenuItem value="" disabled>اختر التخصص</MenuItem>
              {specializationData.map((specialization) => (
                <MenuItem 
                  key={specialization.SPECIALIZATION_ID} 
                  value={specialization.SPECIALIZATION_NAME}
                >
                  {specialization.SPECIALIZATION_NAME}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={4}>
          <Typography className={classes.inputLabel}>
            التقدير
          </Typography>
          <FormControl fullWidth>
            <Select
              name="estimate"
              value={formData.estimate}
              onChange={handleChange}
              className={`${classes.textField} ${classes.select}`}
              displayEmpty
            >
              <MenuItem value="" disabled>اختر التقدير</MenuItem>
              {estimateData.map((estimate) => (
                <MenuItem 
                  key={estimate.ESTIMATE_ID} 
                  value={estimate.ESTIMATE_NAME}
                >
                  {estimate.ESTIMATE_NAME}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Box className={classes.fileUploadContainer}>
        <Typography className={classes.inputLabel}>
          مرفق المؤهل
        </Typography>
        <input
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          className={classes.fileInput}
          id="qualification-file"
          onChange={handleFileChange}
        />
        <label htmlFor="qualification-file" style={{ width: '100%' }}>
          <Button
            component="span"
            className={classes.fileButton}
            variant="outlined"
          >
            {selectedFile ? selectedFile.name : 'اختر ملف'}
            <span className={classes.attachIcon}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path fill="currentColor" d="M16.5,6V17.5A4,4 0 0,1 12.5,21.5A4,4 0 0,1 8.5,17.5V5A2.5,2.5 0 0,1 11,2.5A2.5,2.5 0 0,1 13.5,5V15.5A1,1 0 0,1 12.5,16.5A1,1 0 0,1 11.5,15.5V6H10V15.5A2.5,2.5 0 0,0 12.5,18A2.5,2.5 0 0,0 15,15.5V5A4,4 0 0,0 11,1A4,4 0 0,0 7,5V17.5A5.5,5.5 0 0,0 12.5,23A5.5,5.5 0 0,0 18,17.5V6H16.5Z" />
              </svg>
            </span>
          </Button>
        </label>
        {selectedFile && (
          <Typography className={classes.selectedFile}>
            {selectedFile.name}
          </Typography>
        )}
      </Box>
    </Box>
  );
}
