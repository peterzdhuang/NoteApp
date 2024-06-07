import Nav from "@/components/nav";
import SearchBar from "@/components/SearchBar";
import '../app/globals.css';

export default function landing_page(){
    return(
        <div className="uni-bg">
            <Nav page_name={"university"}></Nav>
            <div className="ml-4">
                <SearchBar></SearchBar>
            </div>
        </div>
    );
};