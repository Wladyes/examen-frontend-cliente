import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { Usuario } from "./Usuario";

@Entity("simulaciones")
export class Simulacion {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "uuid" })
  usuario_id: string;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: "usuario_id" })
  usuario: Usuario;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  capital_inicial: number;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  ganancia_total: number;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  capital_final: number;

  @Column({ type: "json" })
  productos_simulados: object;

  @CreateDateColumn()
  created_at: Date;
}
