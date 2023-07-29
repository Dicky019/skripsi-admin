
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "~/components/ui/card";
  
  interface ICardInformasionProps {
    readonly title: string;
    readonly valueAll: string;
    readonly valueToday: string;
  }
  
  export function CardInformasion({
    title,
    valueAll,
    valueToday,
  }: ICardInformasionProps,) {
    return (
      <Card className="w-[350px]">
        <CardHeader className="text-start p-5">
          <CardTitle className="text-xl">{title}</CardTitle>
          <CardDescription>
            <div className="text-lg flex justify-between">
              <div>Today</div> {valueToday}
            </div>
            <div className="text-lg flex justify-between">
              <div>All</div> {valueAll}
            </div>
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }
  