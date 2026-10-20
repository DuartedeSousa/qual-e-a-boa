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
    function sortear(){
        if (opcoes.length < 2){
            setResultado("Adicione pelo menos 2 opções!");
            return;
        }

        // Como sortear uma posição da lista:
        // 1) Math.random() - número aleatórios entre 0 e 1
        // 2) x opcoes.length - multiplica pelo tamanho da lista
        // 3) Math.floor() - arredonda para Baixo
        const posicao = Math.floor(Math.random() * opcoes.length);

        //opcoes[2] pega o item que está na posição 2 da lista
        const opcaoSorteada = opcoes[posicao];
        setResultado(opcaoSorteada) //aqui ele guarda no useState a tela atualizada!

        //aqui faz o celular vibrar avisando que saiu o resultado
        Haptics.notificationsAsync(Haptics.NotificationFeedbackType.Success)
    }

    // FUNÇÃO DE ADICIONAR UMA OPÇÃO
    function adicionar(){
        //trim retira os espaços do fim e do começo
        const nome = textoDigitado.trim();

        if (nome === "") {
            return; //campo vazio? ----> Não adiciona NADA!
        }

        // Aqui criamos uma nova lista, com tudo o que já tinha + o nome novo
        const listaNova = [...opcoes, nome];
        setOpcoes(listaNova);
        setTextoDigitado(""); // limpa o campo para digitar a póxima.

    }

//FUNÇÃO DE REMOVER UMA OPÇÃO
function remover(nomeParaRemover){

        const listaNova = opcoes.filter((opcao) => opcao !== nomeParaRemover);
        setOpcoes(listaNova);
    }



    //SORTEAR AO CHACOALHAR
    // Nós vamos usar aqui o useEffect, e o sensor
    // use Effect = "faça isto DEPOIS que a tela aparecer"
    //usamos para LIGAR o sensor, e para DESLIGAR quando a tela sair
    useEffect(() =>{
        //aqui pede ao sensor para medir a cada 100 milisegundos (10x por segundo)
        Accelerometer.setUpdateInterval(100);
        
        //Guarda a hora do último sorteio, para não sortear 10 vezes
        //Começa com zero (nunca sorteou)
        //let (e não const) porque este valor vai mudar
        let horaDoUltimoSorteio = 0;

        //addlistener = "Me avise toda vez que o sensor medir algo novo"
        //"dados" chega com as medidas: dados.x, dados.y e dados.z
        const sensor = Accelerometer.addListener((dados) => {
            //math.hypot junta x, y e z num número só: a FORÇA TOTAL
            const forca = Math.hypot(dados.x, dados.y, dados.z);
            const agora = Date.now();
            const tempoPassado = agora - horaDoUltimoSorteio;

            //1 - chacoalhou forte (força maior que o limite)
            //2 - já passou tempo suficiente desde o ultimo sorteio
            if (forca > LIMITE_DE_FORCA && tempoPassado > TEMPO_ENTRE_SORTEIOS){
                horaDoUltimoSorteio = agora;
                sortear();
            }
        });

        return () => sensor.remove();
        //[opcoes] diz: "religue o sensor sempre que a lista mudar"
    }, [opcoes]);

    
}