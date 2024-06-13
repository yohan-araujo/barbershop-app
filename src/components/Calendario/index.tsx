import { VStack } from "native-base";
import CalendarPicker from "react-native-calendar-picker";
import diasSemana from "../../assets/jsons/diasSemana.json";
import meses from "../../assets/jsons/meses.json";
import { eachDayOfInterval, isSunday } from "date-fns";
import BotaoPaginacao from "./BotaoPaginacao";

interface CalendarioProps {
  onDataChange?: (data: Date) => void;
}

const desabilitarDomingos = (dataInicio: Date, dataTermino: Date): Date[] => {
  const todosOsDias = eachDayOfInterval({
    start: dataInicio,
    end: dataTermino,
  });
  return todosOsDias.filter((day) => isSunday(day));
};

export default function Calendario({ onDataChange }: CalendarioProps) {
  const dataMinima = new Date(2024, 0, 1);
  const dataMaxima = new Date(2050, 6, 3);
  const disabledDates = desabilitarDomingos(dataMinima, dataMaxima);

  return (
    <VStack
      bgColor={"black"}
      rounded={"lg"}
      py={5}
      borderWidth={2}
      borderColor={"#E29C31"}
    >
      <CalendarPicker
        startFromMonday={true}
        allowRangeSelection={false}
        minDate={new Date(2024, 1, 1)}
        maxDate={new Date(2050, 6, 3)}
        weekdays={diasSemana}
        months={meses}
        todayBackgroundColor={"white"}
        todayTextStyle={{
          color: "black",
        }}
        selectedDayColor="#E29C31"
        selectedDayTextColor="#000"
        previousComponent={<BotaoPaginacao nome="chevron-back" />}
        nextComponent={<BotaoPaginacao nome="chevron-forward" />}
        textStyle={{
          color: "white",
          fontFamily: "NeohellenicBold",
          fontSize: 16,
        }}
        width={350}
        height={350}
        disabledDates={disabledDates}
        monthTitleStyle={{
          color: "#E29C31",
          fontFamily: "NeohellenicBold",
          textTransform: "uppercase",
        }}
        disabledDatesTextStyle={{
          color: "#cccc",
          fontSize: 16,
        }}
        onDateChange={onDataChange}
      />
    </VStack>
  );
}
