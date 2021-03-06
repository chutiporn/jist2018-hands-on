function getSPARQL001()
{
   var sparql_query = `
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
PREFIX l4a-fin: <http://lod4all.net/ontology/financial/>

SELECT DISTINCT * WHERE {
    <%URI%> skos:prefLabel ?name .
    OPTIONAL{<%URI%> l4a-fin:stname ?stname.}
    OPTIONAL{<%URI%> l4a-fin:address ?address.}
    OPTIONAL{<%URI%> l4a-fin:city ?city.}
    OPTIONAL{<%URI%> l4a-fin:county ?county.}
    OPTIONAL{<%URI%> l4a-fin:zip ?zip.}
    OPTIONAL{<%URI%> l4a-fin:estYmd ?estYmd.}
    OPTIONAL{<%URI%> l4a-fin:uninum ?uninum.}
    OPTIONAL{<%URI%> l4a-fin:fiUninum ?fiUninum.}
    OPTIONAL{<%URI%> l4a-fin:cbsaNo ?cbsaNo.}
    OPTIONAL{<%URI%> l4a-fin:cbsaMetroName ?cbsaMetroName.}
}
   `
   return sparql_query;
}

function getSPARQL002()
{
    var sparql_query = `
PREFIX l4a-fin: <http://lod4all.net/ontology/financial/>

SELECT ?date ?insolvency ?liab1 WHERE {
    <%URI%> l4a-fin:data ?financial_data.
    ?financial_data l4a-fin:date ?org_date .
    ?financial_data l4a-fin:asset ?asset .
    ?financial_data l4a-fin:liab ?liab.
    BIND(xsd:decimal(xsd:decimal(?asset) - xsd:decimal(?liab)) as ?insolvency).
    BIND( xsd:decimal(?liab) as ?liab1).
    BIND(strbefore(?org_date,"T") as ?date)
} ORDER BY (?date)
    `
    return sparql_query;
}

function getSPARQL003()
{
    var sparql_query = `
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
PREFIX schema: <http://schema.org/>
PREFIX dbpedia-owl: <http://dbpedia.org/ontology/>

SELECT DISTINCT * WHERE {
    <%URI%> foaf:primaryTopic ?dbpedia.
    ?dbpedia (rdfs:label | skos:prefLabel | foaf:name | schema:name ) ?name .
    ?dbpedia rdfs:comment ?comment.
    OPTIONAL{ ?dbpedia foaf:homepage ?homepage . }
    OPTIONAL{ ?dbpedia dbpedia-owl:formationDate ?formationDate . }
    OPTIONAL{ ?dbpedia dbpedia-owl:foundationPlace ?foundationPlace. }
    OPTIONAL{ ?dbpedia dbpedia-owl:foundedBy ?foundedBy. }
    FILTER langMatches(lang(?name), "en")
    FILTER langMatches(lang(?comment), "en")
}
    `
    return sparql_query;
}

function getSPARQL004()
{
    var sparql_query = `
PREFIX l4a-fin: <http://lod4all.net/ontology/financial/>

SELECT ?county (xsd:decimal(count(?branch)) as ?num_of_branches) where
{
  <%URI%> l4a-fin:branch ?branch.
  ?branch l4a-fin:county ?county.
} group by ?county order by desc(?num_of_branches)
    `
    return sparql_query;
}
