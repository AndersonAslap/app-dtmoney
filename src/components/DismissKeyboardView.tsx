import { FC, PropsWithChildren } from "react"
import { Keyboard, KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

export const DismissKeyboardView: FC<PropsWithChildren> = ({ children }) => {
    return (
        <SafeAreaView className="flex-1 bg-background-primary">
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView behavior="padding" className="flex-1">
                    <ScrollView>{children}</ScrollView>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    )
}

/**
 * DismissKeyboardView
 *
 * Componente utilitário utilizado para melhorar a experiência do usuário
 * em telas que possuem campos de entrada (TextInput).
 *
 * Responsabilidades dos componentes utilizados:
 *
 * ----------------------------------------------------------------------------
 * SafeAreaView
 * ----------------------------------------------------------------------------
 * Garante que o conteúdo seja renderizado dentro das áreas seguras do
 * dispositivo, evitando que elementos da interface fiquem ocultos por:
 *
 * - Status Bar
 * - Notch
 * - Dynamic Island
 * - Barra de navegação do sistema
 *
 * ----------------------------------------------------------------------------
 * TouchableWithoutFeedback
 * ----------------------------------------------------------------------------
 * Componente capaz de capturar eventos de toque sem apresentar qualquer
 * feedback visual ao usuário.
 *
 * Neste contexto, ele é utilizado para detectar toques fora dos campos
 * de entrada e executar Keyboard.dismiss(), fechando o teclado virtual.
 *
 * ----------------------------------------------------------------------------
 * KeyboardAvoidingView
 * ----------------------------------------------------------------------------
 * Componente responsável por ajustar automaticamente o layout quando o
 * teclado é exibido.
 *
 * Seu principal objetivo é impedir que componentes importantes da tela,
 * como TextInput e botões, fiquem escondidos atrás do teclado.
 * 
 * O atributo behavior faz com que o componente KeyboardAvoidingView adicione 
 * um padding no final do componente previnindo com que o teclado 
 * fique por cima dos nossos componentes, como se fosse uma área segura.
 *
 * ----------------------------------------------------------------------------
 * ScrollView
 * ----------------------------------------------------------------------------
 * Permite que o conteúdo da tela seja rolável quando ultrapassar a área
 * visível do dispositivo.
 *
 * Isso é especialmente útil em formulários extensos ou em dispositivos
 * menores, onde o teclado reduz significativamente a área disponível.
 *
 * ----------------------------------------------------------------------------
 * Benefícios
 * ----------------------------------------------------------------------------
 * - Fecha o teclado ao tocar fora dos campos.
 * - Evita que o teclado cubra componentes da interface.
 * - Permite rolagem em conteúdos maiores que a tela.
 * - Respeita as áreas seguras dos dispositivos.
 * - Centraliza um comportamento reutilizável para formulários.
 */