import { Modal, Text, Button } from "native-base";
import { ButtonEstilizado } from "../ButtonEstilizado";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  titulo: string;
  conteudo: string;
}

export default function ModalEstilizada({
  conteudo,
  isOpen,
  onClose,
  titulo,
}: ModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Content maxWidth="500px" bgColor="black" py={4} borderRadius={8}>
        <Modal.Body
          bgColor="black"
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Text
            fontSize={28}
            fontFamily={"NeohellenicBold"}
            color={"#E29C31"}
            textTransform={"uppercase"}
            textAlign={"center"}
          >
            {titulo}
          </Text>
          <Text
            fontSize={24}
            color={"white"}
            fontFamily={"NeohellenicRegular"}
            textAlign={"center"}
            mt={2}
          >
            {conteudo}
          </Text>
          <ButtonEstilizado texto="Resgatar" mt={4} onPress={onClose} />
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
}
