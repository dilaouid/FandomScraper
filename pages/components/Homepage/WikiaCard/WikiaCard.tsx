import Image from 'next/image';
import './WikiaCard.css';

export default function WikiaCard({ wikia }: { wikia: string }) {
    return(
        <div className="col-span-1 p-4">
            <div className="main-container">
                <a href={`/${wikia}`}>
                    {wikia && ( <Image className="poster" src={`/assets/img/animes/${wikia}.jpg`} alt={wikia} width={230} height={345}/> ) }
                </a>
            </div>
        </div>
    );
};