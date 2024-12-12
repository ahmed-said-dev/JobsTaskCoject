import React, { useEffect, useState } from 'react';
import { Grid, FormControl, Select, MenuItem, Chip, Box } from '@mui/material';
import { Request } from 'coject';

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
        console.log('Skills Data:', data);
        setSkills(data);
      },
    }).then();
  }, []);

  useEffect(() => {
    onUpdate?.({ selectedSkills });
  }, [selectedSkills, onUpdate]);

  const handleChange = (event) => {
    const { value } = event.target;
    setSelectedSkills(value);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <Select
            multiple
            value={selectedSkills}
            onChange={handleChange}
            displayEmpty
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.length === 0 ? (
                  <span>اختر المهارات</span>
                ) : (
                  selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))
                )}
              </Box>
            )}
          >
            {skills.map((skill) => (
              <MenuItem key={skill.SKILL_ID} value={skill.SKILL_NAME}>
                {skill.SKILL_NAME}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
}
