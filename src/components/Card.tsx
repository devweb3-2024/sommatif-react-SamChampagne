import Card from '@mui/material/Card';
import {ICarte} from '../models/Carte'
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';

// Composant qui affiche les cartes de chat
const CardChat = ({ carte, handleCardClick }: { carte: ICarte, handleCardClick: (id: number) => void }) => {
    return (
        // je retourne les infos que j'ai besoins sur la carte tournée
        <Card sx={{ maxWidth: 145, margin: 1 }} onClick={() => !carte.flipped && !carte.matched && handleCardClick(carte.id)}>
        <CardActionArea>
            {carte.flipped || carte.matched ? (
            <CardMedia
                component="img"
                height="140"
                image={carte.image}
                alt={carte.dessusCarte}
            />
            ) : <CardMedia
            component="img"
            height="140"
            image={carte.imageHidden}
            alt={carte.dessusCarte}
        />}
        </CardActionArea>
        </Card>
    );
};
export default CardChat