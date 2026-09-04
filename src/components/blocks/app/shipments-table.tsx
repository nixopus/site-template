import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const shipments = [
  { id: "MSKU 4839201", route: "Qingdao → Oakland", vessel: "Pacific Laurel", eta: "Sep 12", free: "3", status: "On water" },
  { id: "TCLU 7203948", route: "Ningbo → Los Angeles", vessel: "Iron Gannet", eta: "Sep 09", free: "1", status: "At berth" },
  { id: "FSCU 1128462", route: "Rotterdam → Newark", vessel: "Nordic Wing", eta: "Sep 21", free: "5", status: "On water" },
  { id: "BMOU 5561203", route: "Busan → Seattle", vessel: "Sea Halcyon", eta: "Sep 08", free: "2", status: "Customs hold" },
  { id: "GESU 9917465", route: "Haiphong → Long Beach", vessel: "Cormorant", eta: "Sep 30", free: "-", status: "Loading" },
  { id: "TGHU 3348190", route: "Chennai → Savannah", vessel: "Atlas Century", eta: "Arrived", free: "0", status: "On rail" },
  { id: "CAIU 8804312", route: "Santos → Houston", vessel: "Austral Dawn", eta: "Delivered", free: "-", status: "Delivered" },
];

function statusClass(status: string) {
  if (status === "Customs hold") return "border-signal text-signal";
  if (status === "Delivered") return "border-transparent bg-muted text-muted-foreground";
  return "border-border text-foreground";
}

export function ShipmentsTable() {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="border-border bg-muted/60 hover:bg-muted/60">
            {["Container", "Route", "Vessel", "ETA", "Free days", "Status"].map((head) => (
              <TableHead key={head} className="type-overline h-11 px-6 text-muted-foreground">
                {head}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {shipments.map((row) => (
            <TableRow key={row.id} className="border-border">
              <TableCell className="px-6 font-mono text-xs">{row.id}</TableCell>
              <TableCell className="px-6 text-sm">{row.route}</TableCell>
              <TableCell className="px-6 text-sm text-muted-foreground">{row.vessel}</TableCell>
              <TableCell className="px-6 font-mono text-xs">{row.eta}</TableCell>
              <TableCell
                className={`px-6 font-mono text-xs ${
                  row.free !== "-" && Number(row.free) <= 2 ? "text-signal" : ""
                }`}
              >
                {row.free}
              </TableCell>
              <TableCell className="px-6">
                <Badge variant="outline" className={statusClass(row.status)}>
                  {row.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
