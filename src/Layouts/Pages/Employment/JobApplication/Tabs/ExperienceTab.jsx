import React, { useState, useEffect } from 'react';
import { Button, Table, TableHead, TableRow, TableCell, Paper, TableContainer, Modal, Box, TextField, Grid, Typography, IconButton, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { makeStyles } from 'tss-react/mui';
import { Request } from 'coject';

const useStyles = makeStyles()((theme) => ({
  inputLabel: {
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(1),
    fontWeight: 500,
    fontSize: '0.875rem'
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

const ExperienceTab = ({ onUpdate, initialData = {} }) => {
  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const { classes } = useStyles();

  const [formData, setFormData] = useState({
    experience: '',
    location: '',
    position: '',
    startDate: '',
    endDate: ''
  });

  const [experienceData, setExperienceData] = useState([]);
  const [tableData, setTableData] = useState(initialData.tableData || []);

  useEffect(() => {
    Request({
      dataSource: {
        method: 'post',
        dataPath: 'DATA.REF_ID',
        apiUrl: '/PrcExperienceAnyDdl',
        baseUrl: "https://aseer.aait.com.sa:4801/API/C279486795214703A93A3DC417DB35E1/Hrms/Custom",
      },
      data: { TOKEN: '902DBEAE47DE4EB2A471AA338165B66D' },
      callback: (data) => {
        console.log('Experience Data:', data);
        setExperienceData(data);
      },
    }).then();
  }, []);

  useEffect(() => {
    onUpdate?.({ tableData });
  }, [tableData, onUpdate]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSave = () => {
    const newTableData = [...tableData, {
      ...formData,
      file: selectedFile,
      id: Date.now()
    }];
    
    setTableData(newTableData);
    onUpdate?.({ tableData: newTableData });
    
    setFormData({
      experience: '',
      location: '',
      position: '',
      startDate: '',
      endDate: ''
    });
    setSelectedFile(null);
    handleClose();
  };

  const handleDelete = (id) => {
    const newTableData = tableData.filter(item => item.id !== id);
    setTableData(newTableData);
    onUpdate?.({ tableData: newTableData });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
      if (!allowedTypes.includes(file.type)) {
        alert('الرجاء اختيار ملف PDF أو صورة');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert('حجم الملف يجب أن لا يتجاوز 5 ميجابايت');
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
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
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpen}
          sx={{
            backgroundColor: '#556ee6',
            '&:hover': {
              backgroundColor: '#4458b8'
            }
          }}
        >
          إضافة جديد
        </Button>
      </div>
      
      <TableContainer component={Paper} sx={{ backgroundColor: '#F8F9FC' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="right" sx={{ color: '#495057', fontWeight: 600 }}>الخبرة</TableCell>
              <TableCell align="right" sx={{ color: '#495057', fontWeight: 600 }}>المكان</TableCell>
              <TableCell align="right" sx={{ color: '#495057', fontWeight: 600 }}>الوظيفة</TableCell>
              <TableCell align="right" sx={{ color: '#495057', fontWeight: 600 }}>تاريخ بداية العمل</TableCell>
              <TableCell align="right" sx={{ color: '#495057', fontWeight: 600 }}>تاريخ نهاية العمل</TableCell>
              <TableCell align="right" sx={{ color: '#495057', fontWeight: 600 }}>مرفق الخبرات</TableCell>
              <TableCell align="right" sx={{ color: '#495057', fontWeight: 600 }}>الإجراءات</TableCell>
            </TableRow>
          </TableHead>
          {tableData.length > 0 && (
            <tbody>
              {tableData.map((row) => (
                <TableRow key={row.id}>
                  <TableCell align="right">{row.experience}</TableCell>
                  <TableCell align="right">{row.location}</TableCell>
                  <TableCell align="right">{row.position}</TableCell>
                  <TableCell align="right">{row.startDate}</TableCell>
                  <TableCell align="right">{row.endDate}</TableCell>
                  <TableCell align="right">{row.file ? row.file.name : '-'}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      size="small"
                      onClick={() => handleDelete(row.id)}
                      sx={{ color: '#dc3545' }}
                    >
                      <CloseIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </tbody>
          )}
        </Table>
      </TableContainer>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <div className={classes.modalHeader}>
            <h2 style={{ margin: 0 }}>اضافة سجل جديد</h2>
            <IconButton 
              onClick={handleClose}
              size="small"
              sx={{ color: '#495057' }}
            >
              <CloseIcon />
            </IconButton>
          </div>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="experience-label">الخبرة</InputLabel>
                <Select
                  labelId="experience-label"
                  id="experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  label="الخبرة"
                >
                  {experienceData.map((item, index) => (
                    <MenuItem key={index} value={item.EXPERIENCE_NAME}>
                      {item.EXPERIENCE_NAME}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="المكان"
                name="location"
                value={formData.location}
                onChange={handleChange}
                variant="outlined"
                InputProps={{
                  sx: { textAlign: 'right' }
                }}
                sx={{ 
                  '& .MuiInputLabel-root': {
                    right: 20,
                    left: 'auto',
                    transformOrigin: 'right'
                  }
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="الوظيفة"
                name="position"
                value={formData.position}
                onChange={handleChange}
                variant="outlined"
                InputProps={{
                  sx: { textAlign: 'right' }
                }}
                sx={{ 
                  '& .MuiInputLabel-root': {
                    right: 20,
                    left: 'auto',
                    transformOrigin: 'right'
                  }
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="تاريخ بداية العمل"
                name="startDate"
                type="date"
                value={formData.startDate}
                onChange={handleChange}
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  sx: { textAlign: 'right' }
                }}
                sx={{ 
                  '& .MuiInputLabel-root': {
                    right: 20,
                    left: 'auto',
                    transformOrigin: 'right'
                  }
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="تاريخ نهاية العمل"
                name="endDate"
                type="date"
                value={formData.endDate}
                onChange={handleChange}
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  sx: { textAlign: 'right' }
                }}
                sx={{ 
                  '& .MuiInputLabel-root': {
                    right: 20,
                    left: 'auto',
                    transformOrigin: 'right'
                  }
                }}
              />
            </Grid>
          </Grid>
          <Box className={classes.fileUploadContainer}>
            <Typography className={classes.inputLabel}>
              مرفق الخبرات
            </Typography>
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              className={classes.fileInput}
              id="experience-file"
              onChange={handleFileChange}
            />
            <label htmlFor="experience-file" style={{ width: '100%' }}>
              <Button
                component="span"
                className={classes.fileButton}
                variant="outlined"
                fullWidth
              >
                {selectedFile ? selectedFile.name : 'اختر ملف الخبرات'}
                <span className={classes.attachIcon}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.08 12.42l-6.02 6.02c-.59.59-1.37.88-2.15.88s-1.56-.29-2.15-.88c-1.17-1.17-1.17-3.07 0-4.24l6.02-6.02c.39-.39.9-.59 1.41-.59.51 0 1.02.2 1.41.59.78.78.78 2.05 0 2.83l-6.02 6.02c-.2.2-.46.29-.71.29s-.51-.1-.71-.29c-.39-.39-.39-1.02 0-1.41l5.5-5.5" />
                  </svg>
                </span>
              </Button>
            </label>
            {selectedFile && (
              <Typography className={classes.selectedFile}>
                تم اختيار: {selectedFile.name}
              </Typography>
            )}
          </Box>
          <Box className={classes.modalActions}>
            <Button
              variant="outlined"
              onClick={handleClose}
              sx={{
                borderColor: '#556ee6',
                color: '#556ee6',
                '&:hover': {
                  backgroundColor: 'rgba(85, 110, 230, 0.04)',
                  borderColor: '#4458b8'
                }
              }}
            >
              الغاء
            </Button>
            <Button
              variant="contained"
              onClick={handleSave}
              sx={{
                backgroundColor: '#556ee6',
                '&:hover': {
                  backgroundColor: '#4458b8'
                }
              }}
            >
              حفظ
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default ExperienceTab;
