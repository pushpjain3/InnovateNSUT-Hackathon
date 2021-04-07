import React from 'react'
import "./InfoBox.css";
import {Card,CardContent,Typography} from "@material-ui/core";


function InfoBox({title,cases,total}) {
    return (
        <div>
            <Card className="infoBox">
                <CardContent>
                    {/*title */}
                    <Typography  className="infoBox__title"  color="textSecondary">
                        {title}
                    </Typography>
                    {/*cases */}
                    <h2 className="infoBox__cases">{cases}</h2>
                    {/* total*/}
                    <Typography  className="infoBox__total" color="textSecondry">
                        {total} Total
                    </Typography>
                </CardContent>
            </Card>
        </div>
    )
}

export default InfoBox



//card element is from material-UI