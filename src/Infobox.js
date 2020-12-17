import React from 'react'
import './Infobox.css'
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';

function Infobox({ title, cases, total}) {
    return (
        <div>
           <Card className="infobox">
               <CardContent>

                    <Typography 
                    className="infobox__title"
                    color="textSecondary">{title}</Typography>
                    <h2 className="infobox__cases">+{cases}</h2>
                    <Typography className="infobox__total"   color="textSecondary">{total} total</Typography>


               </CardContent>
           </Card> 
        </div>
    )
}

export default Infobox
