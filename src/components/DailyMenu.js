import { LinearGradient } from "expo-linear-gradient"
import { HStack, Image, useTheme, VStack, Text } from "native-base"

const DailyMenu = () => {

    const {colors} = useTheme();
    
    const DailyBowl = ({title}) => {
        return (
            <VStack
                justifyContent="center"
                alignItems="center">
                <Text fontSize="2xl" bold>{title}</Text>
                <Text fontSize="sm" textAlign="center">Liste • de tous • les ingrédients • ici • mauris • blandit • aliquet</Text>
            </VStack>
        )
    }
    
    return (
        
        <VStack position= "relative">

            <LinearGradient
                colors={[colors.primary.pale_green, '#BCE5C7']}
                position= "absolute"
                width= "100%"
                height= "100%"/>
            
            <VStack
                justifyContent="center"
                alignItems="center"
                space={16}
                py={16}
                px={16}
                >

                <HStack
                    justifyContent="space-between"
                    alignItems="center"
                    space={5}
                    >

                    <Image 
                        source={{uri: 'https://bowllywood-8llo.onrender.com/images/bowlicon.png'}}
                        size="md"
                        alt="Bowlliwood icon"/>

                    <VStack
                        pr={2}
                    >
                        <Text fontSize="3xl" bold>Menu du jour</Text>
                        <Text fontSize="md" >
                            Profitez de l’offre exceptionnelle du jour pour seulement 
                            <Text fontSize="lg" bold > 13,50 €</Text>
                        </Text>

                    </VStack>
                </HStack>

                <DailyBowl title="Bowl salé : Maurice" />
                <DailyBowl title="Un petit dessert : Tahiti" />
                
            </VStack>
            
        </VStack>
    
    )
}

export default DailyMenu