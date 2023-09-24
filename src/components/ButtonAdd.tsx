import {
  Actionsheet,
  Button,
  Icon,
  KeyboardAvoidingView,
  useDisclose,
} from "native-base";

import { Ionicons } from "@expo/vector-icons";
import { FormCreateScheduling } from "./FormCreateScheduling";

export function ButtonAdd() {
  const { isOpen, onOpen, onClose } = useDisclose();

  return (
    <Button
      onPress={onOpen}
      backgroundColor="white"
      padding="1.5"
      borderRadius={10}
      ml="2.5"
      _pressed={{ bg: "gray.400" }}
    >
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <KeyboardAvoidingView behavior="padding" enabled w={"100%"}>
          <FormCreateScheduling onClose={onClose} />
        </KeyboardAvoidingView>
      </Actionsheet>

      <Icon as={Ionicons} name="add" size="2xl" color="black" />
    </Button>
  );
}
