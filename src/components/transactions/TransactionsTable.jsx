import { useState, useMemo, useCallback } from "react";
import { useFinanceStore } from "@/store/useFinanceStore";
import { formatCurrency, formatDate, exportToCSV, exportToJSON } from "@/utils/helpers";
import { CATEGORIES } from "@/data/mockData";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, Filter, Download, ChevronUp, ChevronDown, Trash2, Pencil, ChevronLeft, ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import TransactionFormDialog from "./TransactionFormDialog";

const PAGE_SIZE = 10;

const TransactionsTable = () => {
  const transactions = useFinanceStore((s) => s.transactions);
  const role = useFinanceStore((s) => s.role);
  const deleteTransaction = useFinanceStore((s) => s.deleteTransaction);

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortKey, setSortKey] = useState("date");
  const [sortDir, setSortDir] = useState("desc");
  const [page, setPage] = useState(1);
  const [editTxn, setEditTxn] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  const toggleSort = useCallback((key) => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortKey(key); setSortDir("desc"); }
    setPage(1);
  }, [sortKey]);

  const filtered = useMemo(() => {
    let list = [...transactions];
    if (search) {
      const q = search.toLowerCase();
      list = list.filter((t) => t.description.toLowerCase().includes(q) || t.category.toLowerCase().includes(q));
    }
    if (typeFilter !== "all") list = list.filter((t) => t.type === typeFilter);
    if (categoryFilter !== "all") list = list.filter((t) => t.category === categoryFilter);

    list.sort((a, b) => {
      let cmp = 0;
      if (sortKey === "date") cmp = a.date.localeCompare(b.date);
      else if (sortKey === "amount") cmp = a.amount - b.amount;
      else cmp = a.category.localeCompare(b.category);
      return sortDir === "asc" ? cmp : -cmp;
    });
    return list;
  }, [transactions, search, typeFilter, categoryFilter, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const SortIcon = ({ field }) => {
    if (sortKey !== field) return <ChevronUp className="h-3 w-3 opacity-30" />;
    return sortDir === "asc" ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="glass-card rounded-lg p-5"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
          Transactions ({filtered.length})
        </h3>
        <div className="flex items-center gap-2 flex-wrap">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className="pl-8 h-9 w-48 text-sm"
            />
          </div>
          <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)}>
            <Filter className="h-3.5 w-3.5 mr-1" /> Filter
          </Button>
          <Button variant="outline" size="sm" onClick={() => exportToCSV(filtered)}>
            <Download className="h-3.5 w-3.5 mr-1" /> CSV
          </Button>
          <Button variant="outline" size="sm" onClick={() => exportToJSON(filtered)}>
            <Download className="h-3.5 w-3.5 mr-1" /> JSON
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="flex flex-wrap gap-2 mb-4 pb-4 border-b border-border">
              <select
                value={typeFilter}
                onChange={(e) => { setTypeFilter(e.target.value); setPage(1); }}
                className="text-sm bg-secondary text-foreground rounded-md px-3 py-1.5 border border-border"
              >
                <option value="all">All Types</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
              <select
                value={categoryFilter}
                onChange={(e) => { setCategoryFilter(e.target.value); setPage(1); }}
                className="text-sm bg-secondary text-foreground rounded-md px-3 py-1.5 border border-border"
              >
                <option value="all">All Categories</option>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-muted-foreground">
              <th className="text-left py-2 px-2 font-medium cursor-pointer select-none" onClick={() => toggleSort("date")}>
                <span className="flex items-center gap-1">Date <SortIcon field="date" /></span>
              </th>
              <th className="text-left py-2 px-2 font-medium">Description</th>
              <th className="text-left py-2 px-2 font-medium cursor-pointer select-none" onClick={() => toggleSort("category")}>
                <span className="flex items-center gap-1">Category <SortIcon field="category" /></span>
              </th>
              <th className="text-right py-2 px-2 font-medium cursor-pointer select-none" onClick={() => toggleSort("amount")}>
                <span className="flex items-center gap-1 justify-end">Amount <SortIcon field="amount" /></span>
              </th>
              {role === "admin" && <th className="text-right py-2 px-2 font-medium w-20">Actions</th>}
            </tr>
          </thead>
          <tbody>
            <AnimatePresence mode="popLayout">
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={role === "admin" ? 5 : 4} className="text-center py-8 text-muted-foreground">
                    No transactions found
                  </td>
                </tr>
              ) : (
                paginated.map((t) => (
                  <motion.tr
                    key={t.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="border-b border-border/50 hover:bg-secondary/50 transition-colors"
                  >
                    <td className="py-2.5 px-2 whitespace-nowrap">{formatDate(t.date)}</td>
                    <td className="py-2.5 px-2">{t.description}</td>
                    <td className="py-2.5 px-2">
                      <span className="text-xs bg-secondary px-2 py-0.5 rounded-full">{t.category}</span>
                    </td>
                    <td className={`py-2.5 px-2 text-right font-medium whitespace-nowrap ${t.type === "income" ? "text-success" : "text-destructive"}`}>
                      {t.type === "income" ? "+" : "-"}{formatCurrency(t.amount)}
                    </td>
                    {role === "admin" && (
                      <td className="py-2.5 px-2 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button onClick={() => setEditTxn(t)} className="p-1 hover:bg-secondary rounded" aria-label="Edit transaction">
                            <Pencil className="h-3.5 w-3.5 text-muted-foreground" />
                          </button>
                          <button onClick={() => deleteTransaction(t.id)} className="p-1 hover:bg-destructive/10 rounded" aria-label="Delete transaction">
                            <Trash2 className="h-3.5 w-3.5 text-destructive" />
                          </button>
                        </div>
                      </td>
                    )}
                  </motion.tr>
                ))
              )}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
          <span className="text-xs text-muted-foreground">
            Page {page} of {totalPages}
          </span>
          <div className="flex gap-1">
            <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>
              <ChevronLeft className="h-3.5 w-3.5" />
            </Button>
            <Button variant="outline" size="sm" disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)}>
              <ChevronRight className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      )}

      {editTxn && (
        <TransactionFormDialog
          open={!!editTxn}
          onClose={() => setEditTxn(null)}
          transaction={editTxn}
        />
      )}
    </motion.div>
  );
};

export default TransactionsTable;
