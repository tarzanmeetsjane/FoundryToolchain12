import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { History, Filter, ExternalLink, TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { SwapEvent } from "@shared/schema";

interface TransactionHistoryProps {
  poolAddress: string;
}

export default function TransactionHistory({ poolAddress }: TransactionHistoryProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { data: swapEvents = [], isLoading } = useQuery<SwapEvent[]>({
    queryKey: [`/api/pools/${poolAddress}/swaps`],
    enabled: false,
    refetchInterval: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: Infinity,
  });

  const filteredEvents = swapEvents.filter((event) => {
    if (!searchTerm) return true;
    return (
      event.transactionHash.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.recipient.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedEvents = filteredEvents.slice(startIndex, startIndex + itemsPerPage);

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const formatTime = (timestamp: string) => {
    const now = new Date();
    const eventTime = new Date(timestamp);
    const diffMs = now.getTime() - eventTime.getTime();
    const diffMin = Math.floor(diffMs / (1000 * 60));
    const diffHour = Math.floor(diffMin / 60);

    if (diffMin < 60) return `${diffMin} min ago`;
    return `${diffHour}h ago`;
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <History className="text-primary mr-2 h-5 w-5" />
            Transaction History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-48">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">
            <History className="text-primary mr-2 h-5 w-5" />
            Transaction History
          </CardTitle>
          <div className="flex items-center space-x-4">
            <Input
              type="text"
              placeholder="Search by address or tx hash..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-64"
            />
            <Button variant="outline" className="bg-primary/20 text-primary hover:bg-primary/30">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {paginatedEvents.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No transactions found</p>
            {searchTerm && (
              <p className="text-sm text-muted-foreground mt-2">
                Try adjusting your search criteria
              </p>
            )}
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-border">
                    <TableHead className="text-muted-foreground">Type</TableHead>
                    <TableHead className="text-muted-foreground">Amount</TableHead>
                    <TableHead className="text-muted-foreground">Price</TableHead>
                    <TableHead className="text-muted-foreground">Total Value</TableHead>
                    <TableHead className="text-muted-foreground">Time</TableHead>
                    <TableHead className="text-muted-foreground">Transaction</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedEvents.map((event) => (
                    <TableRow
                      key={`${event.transactionHash}-${event.logIndex}`}
                      className="border-border hover:bg-background/50"
                    >
                      <TableCell>
                        <Badge
                          variant={event.tradeType === "BUY" ? "default" : "destructive"}
                          className={`inline-flex items-center ${
                            event.tradeType === "BUY"
                              ? "bg-green-500/20 text-green-500"
                              : "bg-red-500/20 text-red-500"
                          }`}
                        >
                          {event.tradeType === "BUY" ? (
                            <TrendingUp className="mr-1 h-3 w-3" />
                          ) : (
                            <TrendingDown className="mr-1 h-3 w-3" />
                          )}
                          {event.tradeType}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-semibold">
                        {parseFloat(event.ethAmount).toFixed(6)} ETH
                      </TableCell>
                      <TableCell>${parseFloat(event.price).toLocaleString()}</TableCell>
                      <TableCell className="font-semibold">
                        ${parseFloat(event.usdcAmount).toLocaleString()}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {formatTime(event.timestamp.toString())}
                      </TableCell>
                      <TableCell>
                        <a
                          href={`https://etherscan.io/tx/${event.transactionHash}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline text-sm font-mono inline-flex items-center"
                        >
                          {formatAddress(event.transactionHash)}
                          <ExternalLink className="ml-1 h-3 w-3" />
                        </a>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-6">
              <span className="text-sm text-muted-foreground">
                Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredEvents.length)} of{" "}
                {filteredEvents.length} transactions
              </span>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                {[...Array(Math.min(5, totalPages))].map((_, i) => {
                  const pageNum = i + 1;
                  return (
                    <Button
                      key={pageNum}
                      variant={currentPage === pageNum ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(pageNum)}
                      className={
                        currentPage === pageNum
                          ? "bg-primary text-primary-foreground"
                          : ""
                      }
                    >
                      {pageNum}
                    </Button>
                  );
                })}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
