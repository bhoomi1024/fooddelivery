import React, { useState } from 'react';
import { Card, CardContent, Typography, TextField, MenuItem, Switch, FormControl, InputLabel, Select, Chip, Checkbox } from '@mui/material';
import BackgroundImage from '../../assets/graph.jpeg'; // Ensure the path is correct

const daysOfWeek = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

const DelSettings = () => {
  const [startHour, setStartHour] = useState('9');
  const [startMinute, setStartMinute] = useState('00');
  const [endHour, setEndHour] = useState('9');
  const [endMinute, setEndMinute] = useState('00');
  const [isAM, setIsAM] = useState(true);
  const [availableDays, setAvailableDays] = useState([]);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const handleStartHourChange = (event) => {
    setStartHour(event.target.value);
  };

  const handleStartMinuteChange = (event) => {
    setStartMinute(event.target.value);
  };

  const handleEndHourChange = (event) => {
    setEndHour(event.target.value);
  };

  const handleEndMinuteChange = (event) => {
    setEndMinute(event.target.value);
  };

  const handleAMPMChange = (event) => {
    setIsAM(event.target.value === 'AM');
  };

  const handleDaysChange = (event) => {
    const {
      target: { value },
    } = event;
    setAvailableDays(typeof value === 'string' ? value.split(',') : value);
  };

  const handleNotificationToggle = () => {
    setNotificationsEnabled(!notificationsEnabled);
  };

  return (
    <div className="bg-gradient-to-r from-white via-yellow-100 to-white ml-60 mt-[78px] w-full font-poppins h-screen flex items-center justify-center relative">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={BackgroundImage}
          alt="Background"
          className="w-full h-full object-cover blur-sm opacity-30"
        />
      </div>

      <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow w-full max-w-xl p-8 border border-yellow-300 relative z-10">
        <CardContent className="text-center">
          <Typography variant="h4" className="text-yellow-500 font-bold mb-4">
            Settings
          </Typography>

          <div className="mt-4">
            <Typography variant="h6" className="text-yellow-600 font-bold mb-2">
              Notification Preferences
            </Typography>
            <div className="flex justify-center items-center mb-4">
              <Typography variant="body1" className="text-gray-800 mr-2">
                Notifications:
              </Typography>
              <Switch checked={notificationsEnabled} onChange={handleNotificationToggle} />
            </div>
          </div>

          <div className="mt-4">
            <Typography variant="h6" className="text-yellow-600 font-bold mb-2">
              Availability
            </Typography>
            <div className="mb-4">
              <Typography variant="body1" className="text-gray-800">
                Available Hours:
              </Typography>
              <div className="flex space-x-2">
                <TextField
                  select
                  value={startHour}
                  onChange={handleStartHourChange}
                  className="w-1/3"
                >
                  {Array.from({ length: 12 }, (_, i) => (
                    <MenuItem key={i} value={i + 1}>{i + 1}</MenuItem>
                  ))}
                </TextField>
                <TextField
                  select
                  value={startMinute}
                  onChange={handleStartMinuteChange}
                  className="w-1/3"
                >
                  <MenuItem value="00">00</MenuItem>
                  <MenuItem value="15">15</MenuItem>
                  <MenuItem value="30">30</MenuItem>
                  <MenuItem value="45">45</MenuItem>
                </TextField>
                <TextField
                  select
                  value={isAM ? 'AM' : 'PM'}
                  onChange={handleAMPMChange}
                  className="w-1/3"
                >
                  <MenuItem value="AM">AM</MenuItem>
                  <MenuItem value="PM">PM</MenuItem>
                </TextField>
              </div>
              <div className="flex space-x-2 mt-4">
                <TextField
                  select
                  value={endHour}
                  onChange={handleEndHourChange}
                  className="w-1/3"
                >
                  {Array.from({ length: 12 }, (_, i) => (
                    <MenuItem key={i} value={i + 1}>{i + 1}</MenuItem>
                  ))}
                </TextField>
                <TextField
                  select
                  value={endMinute}
                  onChange={handleEndMinuteChange}
                  className="w-1/3"
                >
                  <MenuItem value="00">00</MenuItem>
                  <MenuItem value="15">15</MenuItem>
                  <MenuItem value="30">30</MenuItem>
                  <MenuItem value="45">45</MenuItem>
                </TextField>
                <TextField
                  select
                  value={isAM ? 'AM' : 'PM'}
                  onChange={handleAMPMChange}
                  className="w-1/3"
                >
                  <MenuItem value="AM">AM</MenuItem>
                  <MenuItem value="PM">PM</MenuItem>
                </TextField>
              </div>
            </div>
            <div>
              <Typography variant="body1" className="text-gray-800">
                Days:
              </Typography>
              <FormControl className="w-full">
                <InputLabel id="days-select-label">Select Days</InputLabel>
                <Select
                  labelId="days-select-label"
                  multiple
                  value={availableDays}
                  onChange={handleDaysChange}
                  renderValue={(selected) => (
                    <div className="flex flex-wrap">
                      {selected.map((value) => (
                        <Chip key={value} label={value} className="mr-1 mb-1" />
                      ))}
                    </div>
                  )}
                >
                  {daysOfWeek.map((day) => (
                    <MenuItem key={day} value={day}>
                      <Checkbox checked={availableDays.indexOf(day) > -1} />
                      {day}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DelSettings;
