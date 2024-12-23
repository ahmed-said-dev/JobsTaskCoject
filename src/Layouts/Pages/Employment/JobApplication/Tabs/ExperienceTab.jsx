import React, { useState, useEffect } from 'react';
import { Button, Table, TableHead, TableRow, TableCell, Paper, TableContainer, Modal, Box, Grid, Typography, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { makeStyles } from 'tss-react/mui';
import { Request, Input, Select, Upload, Form, DatePicker } from 'coject';

const useStyles = makeStyles()((theme) => ({
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

const ExperienceTab = ({ onUpdate, initialData = {} }) => {
  const [open, setOpen] = useState(false);
  const { classes } = useStyles();
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
        setExperienceData(data);
      },
    }).then();
  }, []);

  useEffect(() => {
    if (initialData.tableData !== tableData) {
      onUpdate?.({ tableData });
    }
  }, [tableData, onUpdate, initialData.tableData]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSave = (values) => {
    const newTableData = [...tableData, {
      ...values,
      id: Date.now()
    }];

    setTableData(newTableData);
    onUpdate?.({ tableData: newTableData });
    handleClose();
  };

  const handleDelete = (id) => {
    const newTableData = tableData.filter(item => item.id !== id);
    setTableData(newTableData);
    onUpdate?.({ tableData: newTableData });
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
              <TableCell align="right" sx={{ color: '#495057', fontWeight: 600 }}>المسمى الوظيفي</TableCell>
              <TableCell align="right" sx={{ color: '#495057', fontWeight: 600 }}>تاريخ البداية</TableCell>
              <TableCell align="right" sx={{ color: '#495057', fontWeight: 600 }}>تاريخ النهاية</TableCell>
              <TableCell align="right" sx={{ color: '#495057', fontWeight: 600 }}>المرفقات</TableCell>
              <TableCell align="right" sx={{ color: '#495057', fontWeight: 600 }}>الإجراءات</TableCell>
            </TableRow>
          </TableHead>
          {tableData.map((row) => (
            <TableRow key={row.id}>
              <TableCell align="right">{row.experience}</TableCell>
              <TableCell align="right">{row.location}</TableCell>
              <TableCell align="right">{row.position}</TableCell>
              <TableCell align="right">{row.startDate}</TableCell>
              <TableCell align="right">{row.endDate}</TableCell>
              <TableCell align="right">
                {row.attachments && row.attachments.length > 0 ? 'مرفق' : 'لا يوجد مرفقات'}
              </TableCell>
              <TableCell align="right">
                <IconButton onClick={() => handleDelete(row.id)} color="error">
                  <CloseIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </Table>
      </TableContainer>

      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <div className={classes.modalHeader}>
            <Typography variant="h6" sx={{ fontWeight: 600, color: '#495057' }}>
              إضافة خبرة جديدة
            </Typography>
            <IconButton onClick={handleClose} size="small">
              <CloseIcon />
            </IconButton>
          </div>

          <Form onSubmit={handleSave}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography className={classes.inputLabel}>
                  الخبرة
                </Typography>
                <Select
                  name="experience"
                  label=" "
                  validation={{ }}
                  variant="outlined"
                  fullWidth
                  staticData={experienceData}
                  getOptionLabel={(option) => option?.label || ''}
                  getOptionValue={(option) => option?.value || ''}
                  customKey='EXPERIENCE_ID'
                  customName='EXPERIENCE_NAME'
                />
              </Grid>

              <Grid item xs={12}>
                <Typography className={classes.inputLabel}>
                  المكان
                </Typography>
                <Input
                  name="location"
                  label=""
                  placeholder="ادخل المكان"
                  validation={{ arabic: 'يجب إدخال حروف عربية فقط' }}
                  variant="outlined"
                  fullWidth
                />
              </Grid>

              <Grid item xs={12}>
                <Typography className={classes.inputLabel}>
                  المسمى الوظيفي
                </Typography>
                <Input
                  name="position"
                  label=""
                  placeholder="ادخل المسمى الوظيفي"
                  validation={{ arabic: 'يجب إدخال حروف عربية فقط' }}
                  variant="outlined"
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography className={classes.inputLabel}>
                  تاريخ البداية
                </Typography>
                <DatePicker
                  name="startDate"
                  label=""
                  validation={{ }}
                  variant="outlined"
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography className={classes.inputLabel}>
                  تاريخ النهاية
                </Typography>
                <DatePicker
                  name="endDate"
                  label=""
                  validation={{ }}
                  variant="outlined"
                  fullWidth
                />
              </Grid>

              <Grid item xs={12}>
                <Typography className={classes.inputLabel}>
                  المرفقات
                </Typography>
                <Upload
                  name="attachments"
                  imagePath="file"
                  validation={{ }}
                  multiple
                />
              </Grid>
            </Grid>

            <div className={classes.modalActions}>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: '#556ee6',
                  '&:hover': {
                    backgroundColor: '#4458b8'
                  }
                }}
              >
                حفظ
              </Button>
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
                إلغاء
              </Button>
            </div>
          </Form>
        </Box>
      </Modal>
    </div>
  );
};

export default ExperienceTab;
