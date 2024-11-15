import { useState, useEffect } from 'react';
import { ICarte } from '../models/Carte';
import CardChat from './card';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import initialCards from '../data/CarteInitiale';
import Popup from './popup'

// mélanger les cartes au début de la partie
const shuffleCards = (cards: ICarte[]) => {
    return cards.sort(() => Math.random() - 0.5);
};
// Jeu de mémoire
const MemoryGame = () => {
    // Mélanger les cartes au début
    const [cards, setCards] = useState<ICarte[]>(shuffleCards([...initialCards]));
    const [flippedCards, setFlippedCards] = useState<number[]>([]);
    const [essai, setEssai] = useState<number>(20);
    const [afficherPerdu, setAfficherPerdu] = useState<boolean>(false);
    const [afficherGagner, setAfficherGagner] = useState<boolean>(false);
    

    // Handler pour le bouton "Recommencer"
    const handleClickRecommencer = () => {
        window.location.reload();
    };

    // Handler pour la sélection d'une carte
    const handleCardClick = (id: number) => {
        
        if (flippedCards.length === 2) {
            return;
        }

        const newCards = cards.map(card =>
            card.id === id ? { ...card, flipped: true } : card
        );

        // Modification des cartes séléctionner
        setCards(newCards);
        setFlippedCards([...flippedCards, id]);

    
    };
    // Vérifie si toute les cartes sont trouver
    useEffect(() => {
        if (cards.every(card => card.matched)) {
            setAfficherGagner(true);
        }
    }, [cards]);
    // Vérifie si l'usager à perdu et retourne les cartes
    useEffect(() => {
        if (essai === 0) {

            // Time out un peu plus élevé que celui qui retourne les cartes pour éviter de retourner une carte 
            setTimeout(() => {
                setCards(prevCards =>
                    prevCards.map(card => ({ ...card, flipped: true })) 
                );
            }, 900);
            
            setTimeout(() => {
                setAfficherPerdu(true);
            }, 3000);
            
            
        }
    }, [essai]);

    // Valide si les paires de carte marche et si deux carte sont au moins retourné
    useEffect(() => {
        if (flippedCards.length === 2) {
            const [firstId, secondId] = flippedCards;
            // Récupère la première carte et deuxième carte
            const firstCard = cards.find(card => card.id === firstId);
            const secondCard = cards.find(card => card.id === secondId);
            
            // Vérifie le type des cartes tournées
            if (firstCard && secondCard && firstCard.type === secondCard.type) {
                // Marquer les cartes comme identique
                setCards(prevCards =>
                    prevCards.map(card =>
                        card.type === firstCard.type ? { ...card, matched: true } : card
                    )
                );
            } else {
                // Retourner les cartes après un délai si elle ne sont pas identique
                setEssai(essai - 1);
                setTimeout(() => {
                    setCards(prevCards =>
                        prevCards.map(card =>
                            card.id === firstId || card.id === secondId ? { ...card, flipped: false } : card
                        )
                    );
                }, 800);
            }
            setFlippedCards([]);
        }
    }, [flippedCards, cards]);

    return (
        <div>
            <Button variant="contained" onClick={handleClickRecommencer}>Recommencer</Button>
            <p>Nombre de coups restants: {essai}</p>
            <Popup lancer={afficherPerdu} titre={"Perdu"}  message={"Vous avez perdu la partie"} Click={handleClickRecommencer}></Popup>
            <Popup lancer={afficherGagner} titre={"Gagner"}  message={"Vous avez gagnez la partie, veuillez recommencer"} Click={handleClickRecommencer}></Popup>
            <Grid container maxWidth={700} spacing={0} justifyContent="center">
                {cards.map(carte => (
                    <Grid justifyContent="center"   container item xs={3} sm={3} md={3} key={carte.id}>
                        <CardChat carte={carte} handleCardClick={handleCardClick} />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default MemoryGame;
