import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CircularProgress } from '@mui/material';


export default function StudentIdCard({image , names , course, email}) {
  const theme = useTheme();

  return (


    <Card sx={{ marginLeft: 45 ,marginRight: 50  }}>
        <Typography  sx={{marginLeft: 14, flexGrow: 1,   marginTop: 2  }}
         component="div" variant="h5">
            IM SYSTEM
          </Typography>
       {image ? <CardMedia
        component="img"
        sx={{marginLeft: 10, marginTop: 2 , borderRadius: 3 ,  width: 200 }}
        image= {image}
        alt="Loading"
      />:<CircularProgress disableShrink sx={{marginLeft: 20 , marginTop: 5, marginBottom: 5}} /> }
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography sx={{textAlign: 'center', flexGrow: 1,   marginTop: 1  }} component="div" color="text.secondary" variant="h5">
            {names}
          </Typography>
          <Typography  sx={{textAlign: 'center', marginTop: 1 , flexGrow: 30 , }} variant="h6"   component="div">
          {course}
          </Typography>
          <Typography  sx={{textAlign: 'center', marginBottom: 2, flexGrow: 30 , }} variant="p" color='text.secondary'   component="div">
          {email}
          </Typography>
        </CardContent>
      </Box>   
    </Card>
  );
}