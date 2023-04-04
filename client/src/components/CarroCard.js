import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';

function CarroCard() {
    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                height: '100vh',
                width: '100vw',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
        <Card style={{
            height: 400,
            width: 300
        }}>
            <CardContent>
                <Typography variant="h5" component="h2">
                    Título do Card
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                    Subtítulo do Card
                </Typography>
                <Typography variant="body2" component="p">
                    Conteúdo do Card
                </Typography>
            </CardContent>
        </Card>
        </div>
    );
}

export default CarroCard;
