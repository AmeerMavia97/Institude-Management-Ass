import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CircularProgress } from '@mui/material';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';


const style = {
    py: 0,
    width: '100%',
    maxWidth: 360,
    borderRadius: 2,
    borderColor: 'divider',
    backgroundColor: 'background.paper',
};

export default function StudentIdCard({ image, names, course, email , gender , address }) {
    const theme = useTheme();

    return (

        <>

            <Box sx={{ display: 'flex', gap: 5, justifyContent: 'center' }}>

                <Card sx={{width: 300}}>
                    <Typography sx={{ textAlign: 'center', flexGrow: 1, marginTop: 2 }}
                        component="div" variant="h5">
                        IM SYSTEM
                    </Typography>
                    {image ? <CardMedia
                        component="img"
                        sx={{ marginLeft: "14%", marginTop: 2, borderRadius: 3, width: 200 }}
                        image={image}
                        alt="Loading"
                    /> : <CircularProgress disableShrink sx={{ marginLeft: 20, marginTop: 5, marginBottom: 5 }} />}
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <CardContent sx={{ flex: '1 0 auto' }}>
                            <Typography sx={{ textAlign: 'center', flexGrow: 1, marginTop: 0 }} component="div" color="text.secondary" variant="h5">
                                {names}
                            </Typography>
                            <Typography sx={{ textAlign: 'center', marginTop: 0, flexGrow: 30, }} variant="h6" component="div">
                                {course}
                            </Typography>
                            <Typography sx={{ textAlign: 'center', marginBottom: 2, flexGrow: 30, }} variant="p" color='text.secondary' component="div">
                                {email}
                            </Typography>
                        </CardContent>
                    </Box>
                </Card>


                <Card sx={{width: 290}}>
                    <Typography sx={{ textAlign: 'center', flexGrow: 1, marginTop: 2 }}
                        component="div" variant="h5">
                        IM SYSTEM
                    </Typography>
                    {image ? <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <CardContent sx={{ flex: '1 0 auto' }}>
                            <List sx={style}>
                                <ListItem>
                                    <ListItemText primary={names} />
                                </ListItem>
                                <Divider variant="middle" component="li" />
                                <ListItem>
                                    <ListItemText primary={email} />
                                </ListItem>
                                <Divider variant="middle" component="li" />
                                <ListItem>
                                    <ListItemText primary={gender} />
                                </ListItem>
                                <Divider variant="middle" component="li" />
                                <ListItem>
                                    <ListItemText primary={address} />
                                </ListItem>
                                <Divider variant="middle" component="li" />
                                <ListItem>
                                    <ListItemText primary={course} />
                                </ListItem>
                                <Divider variant="middle" component="li" />
                            </List>


                        </CardContent>
                    </Box> : <CircularProgress disableShrink sx={{ marginLeft: 20, marginTop: 5, marginBottom: 5 }} />}
                </Card>

            </Box>

        </>



    );
}