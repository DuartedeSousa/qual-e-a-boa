// =================================================
// index.js - Qual a é a boa?
// =================================================

// ETAPA 1 - Trazer as ferramentas (import)
import {useState, useEffect} from "react";
// View -> uma caixa, serve para agrupar e organizar as coisas 
// Text -. Todo texto precisa estar dentro de um <text>
// TextInput -> um campo para digitar
// pressable -> qualquer coisa que dá pra tocar, nosso botão
// StyleSheet -> ferramenta pra escrever os estilos
import {View, Text, TextImput, Pressable, ScrollView, styleSheet } from "react-native";
import { cores } from "../data/tema"
import { Accelerometer } from "expo-sensors";
import * as Haptics from "expo-haptics";

const LIMITE_DE_FORCA = 1.8;
const TEMPO_ENTRE_SORTEIOS = 1000; //milissegundos: 1000 = 1 segundo

// ETAPA 01 - CRIAR A TELA

export default function Home(){
    // começa com 3 opções para já ter o que sortear
    const [opcoes, setOpcoes] = useState(["Pizza", "Hambúrguer", "Sushi"]);
    
    //A opção que foi sorteada. Começa vazia ("") porque ainda não sorteou
    const [resultado, setResultado] = useState("");

    // O que a pessoa está digitando no campo. Neste caso começa vazio.
    const [textoDigitado, setTextoDigitado] = useState("");

    // FUNÇÃO SORTEAR
}

