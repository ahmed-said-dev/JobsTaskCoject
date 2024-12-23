import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { Request, Select, Form } from 'coject';

export default function SkillsTab({ onUpdate, initialData }) {
  const [skills, setSkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState(initialData?.selectedSkills || []);

  useEffect(() => {
    Request({
      dataSource: {
        method: 'post',
        dataPath: 'DATA.REF_ID',
        apiUrl: '/PrcSkillAnyDdl',
        baseUrl: "https://aseer.aait.com.sa:4801/API/C279486795214703A93A3DC417DB35E1/Hrms/Custom",
      },
      data: { TOKEN: '902DBEAE47DE4EB2A471AA338165B66D' },
      callback: (data) => {
        setSkills(data);
      },
    }).then();
  }, []);

  const handleChange = (_,value) => {
    const formattedData = value.map(item => ( item.SKILL_ID ));
    setSelectedSkills(formattedData);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Form>
          <Select
            name="skills"
            label="المهارات"
            multiple
            value={selectedSkills}
            onChange={handleChange}
            validation={{ required: '' }}
            variant="outlined"
            fullWidth
            staticData={skills}
            placeholder="اختر المهارات"
            customKey='SKILL_ID'
            customName='SKILL_NAME'
          />
        </Form>
      </Grid>
    </Grid>
  );
}
