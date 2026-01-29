"""
Migration : rend la colonne priority de la table tickets nullable (sans valeur par défaut).
Les tickets créés par l'utilisateur n'ont pas de priorité ; elle est définie par le DSI/Adjoint DSI à l'assignation.
Aucune donnée existante n'est modifiée (les tickets gardent leur priorité actuelle).
"""
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker
import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = (
    f"postgresql://{os.getenv('POSTGRES_USER', 'tickets_user')}:"
    f"{os.getenv('POSTGRES_PASSWORD', 'password')}@"
    f"{os.getenv('POSTGRES_HOST', 'localhost')}:"
    f"{os.getenv('POSTGRES_PORT', '5432')}/"
    f"{os.getenv('POSTGRES_DB', 'tickets_db')}"
)

engine = create_engine(DATABASE_URL)
Session = sessionmaker(bind=engine)


def migrate_priority_nullable():
    db = Session()
    try:
        print("Rendre la colonne 'priority' nullable (sans valeur par défaut)...")
        # Supprimer la valeur par défaut pour permettre NULL sur les nouveaux tickets
        db.execute(text("ALTER TABLE tickets ALTER COLUMN priority DROP DEFAULT"))
        db.commit()
        print("OK - Default supprimé.")

        db.execute(text("ALTER TABLE tickets ALTER COLUMN priority DROP NOT NULL"))
        db.commit()
        print("OK - Colonne 'priority' nullable.")

        print("\nMigration terminée. Aucune donnée existante n'a été modifiée.")
        print("Les nouveaux tickets créés par l'utilisateur pourront avoir priority NULL jusqu'à ce que le DSI/Adjoint DSI la définisse.")

    except Exception as e:
        db.rollback()
        print(f"ERREUR lors de la migration: {e}")
        raise
    finally:
        db.close()


if __name__ == "__main__":
    migrate_priority_nullable()
