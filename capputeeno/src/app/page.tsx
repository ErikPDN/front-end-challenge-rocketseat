"use client";

import { FilterBar } from "../components/filter-bar";
import { ProductsList } from "../components/products-list";
import styles from "./page.module.css";

export default function Home() {

  return (
    <main className={styles.main}>
      <FilterBar />
      <ProductsList />
    </main>
  );
}
