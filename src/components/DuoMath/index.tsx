import { useState } from "react";
import { View, Text, Modal, ModalProps, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { MaterialIcons } from '@expo/vector-icons'
import { CheckCircle } from 'phosphor-react-native'
import * as Clipboard from 'expo-clipboard';

import { styles } from './styles'
import { THEME } from "../../theme";
import { Heading } from "../Heading";

interface Props extends ModalProps {
    discord: string
    onClose: () => void
}

export function DuoMath({ discord, onClose, ...rest }: Props) {
    const [isCopping, setIsCopping] = useState(false)

    async function handleCopyDiscordUserToClipboard() {
        setIsCopping(true)
        await Clipboard.setStringAsync(discord)

        Alert.alert("Discord Cópiado", "Usuário copiado para você colar no seu Discord.")
        setIsCopping(false)
    }
    return (
        <Modal
            animationType="fade"
            transparent
            statusBarTranslucent
            {...rest}
        >
            <View style={styles.container}>
                <View style={styles.content}>
                    <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
                        <MaterialIcons name="close" size={20} color={THEME.COLORS.CAPTION_500} />
                    </TouchableOpacity>

                    <CheckCircle size={64} color={THEME.COLORS.SUCCESS} weight="bold" />

                    <Heading
                        title="Let's Play!"
                        subtitle="Agora é so começar a jogar."
                        style={{ alignItems: 'center', marginTop: 24 }}
                    />

                    <Text style={styles.label}>
                        Adicione seu Discord
                    </Text>

                    <TouchableOpacity 
                        style={styles.discordButton} 
                        onPress={handleCopyDiscordUserToClipboard}
                        disabled={isCopping}
                    >
                        <Text style={styles.discord}>
                            {isCopping ? <ActivityIndicator color={THEME.COLORS.PRIMARY}/> : discord }
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}